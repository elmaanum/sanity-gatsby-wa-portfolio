import os
import asyncio
import logging
from pathlib import Path

import requests
import resend
from dotenv import load_dotenv
from fastapi import FastAPI, APIRouter, HTTPException
from pydantic import BaseModel, EmailStr, Field
from starlette.middleware.cors import CORSMiddleware

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / ".env")

# Resend
resend.api_key = os.environ.get("RESEND_API_KEY", "")
SENDER_EMAIL = os.environ.get("SENDER_EMAIL", "onboarding@resend.dev")
RECIPIENT_EMAIL = os.environ.get("RECIPIENT_EMAIL", "info@whittenassociates.com")

# Sanity
SANITY_PROJECT_ID = os.environ.get("SANITY_PROJECT_ID", "6raq5w4t")
SANITY_DATASET = os.environ.get("SANITY_DATASET", "production")
SANITY_API_VERSION = os.environ.get("SANITY_API_VERSION", "2024-01-01")
SANITY_READ_TOKEN = os.environ.get("SANITY_READ_TOKEN", "")

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
)
logger = logging.getLogger(__name__)

app = FastAPI(title="Whitten Associates API")
api_router = APIRouter(prefix="/api")


class ContactMessage(BaseModel):
    name: str = Field(..., min_length=1, max_length=200)
    email: EmailStr
    company: str | None = Field(default="", max_length=200)
    message: str = Field(..., min_length=1, max_length=5000)


@api_router.get("/")
async def root():
    return {"message": "Whitten Associates API"}


@api_router.get("/health")
async def health():
    return {"status": "ok", "resend_configured": bool(resend.api_key)}


class SanityQuery(BaseModel):
    query: str
    params: dict | None = None


@api_router.post("/sanity")
async def sanity_query(body: SanityQuery):
    """Server-side proxy for Sanity GROQ queries (avoids browser CORS)."""
    import json as _json
    url = f"https://{SANITY_PROJECT_ID}.api.sanity.io/v{SANITY_API_VERSION}/data/query/{SANITY_DATASET}"
    payload = {"query": body.query}
    if body.params:
        # Sanity expects each param JSON-encoded (e.g. $slug must be "architecture" with quotes)
        for k, v in body.params.items():
            payload[f"${k}"] = _json.dumps(v)
    headers = {}
    if SANITY_READ_TOKEN:
        headers["Authorization"] = f"Bearer {SANITY_READ_TOKEN}"
    try:
        r = await asyncio.to_thread(requests.get, url, params=payload, headers=headers, timeout=15)
        r.raise_for_status()
        data = r.json()
        return {"result": data.get("result", None)}
    except Exception as e:
        logger.exception("Sanity query failed")
        raise HTTPException(status_code=502, detail=f"Sanity query failed: {e}")


def _build_html(body: ContactMessage) -> str:
    safe_msg = body.message.replace("\n", "<br/>")
    return f"""
    <table width="100%" cellpadding="0" cellspacing="0" style="font-family: -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif; color:#202123; max-width:640px;">
      <tr><td style="padding:16px 0; border-bottom:2px solid #31c17c;">
        <h2 style="margin:0; font-size:20px; color:#3a506b;">New contact form submission</h2>
      </td></tr>
      <tr><td style="padding:16px 0;">
        <p style="margin:0 0 8px;"><strong>Name:</strong> {body.name}</p>
        <p style="margin:0 0 8px;"><strong>Email:</strong> <a href="mailto:{body.email}" style="color:#3a506b;">{body.email}</a></p>
        <p style="margin:0 0 8px;"><strong>Company:</strong> {body.company or '-'}</p>
        <p style="margin:16px 0 8px;"><strong>Message:</strong></p>
        <div style="padding:12px 16px; background:#f6f7f9; border-left:3px solid #31c17c;">{safe_msg}</div>
      </td></tr>
      <tr><td style="padding:16px 0; color:#7a7a7a; font-size:12px;">
        Sent from whittenassociates.com contact form
      </td></tr>
    </table>
    """


@api_router.post("/contact")
async def submit_contact(body: ContactMessage):
    if not resend.api_key:
        # Soft-success in dev so the form UX works before keys are set.
        logger.warning("RESEND_API_KEY not set — logging form submission only.")
        logger.info(
            "Contact: name=%s email=%s company=%s message=%s",
            body.name, body.email, body.company, body.message,
        )
        return {"status": "queued", "delivered": False}

    params = {
        "from": SENDER_EMAIL,
        "to": [RECIPIENT_EMAIL],
        "reply_to": body.email,
        "subject": f"New website inquiry from {body.name}",
        "html": _build_html(body),
    }
    try:
        result = await asyncio.to_thread(resend.Emails.send, params)
        return {"status": "sent", "delivered": True, "id": result.get("id")}
    except Exception as e:
        logger.exception("Failed to send contact email")
        raise HTTPException(status_code=500, detail=f"Email send failed: {e}")


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get("CORS_ORIGINS", "*").split(","),
    allow_methods=["*"],
    allow_headers=["*"],
)
