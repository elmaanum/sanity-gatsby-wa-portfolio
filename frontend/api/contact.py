"""Vercel serverless function: contact form → Resend email.

Routed at /api/contact. Mirrors the FastAPI version in backend/server.py.
"""
import json
import os
import re

import resend

resend.api_key = os.environ.get("RESEND_API_KEY", "")
SENDER_EMAIL = os.environ.get("SENDER_EMAIL", "onboarding@resend.dev")
RECIPIENT_EMAIL = os.environ.get("RECIPIENT_EMAIL", "info@maanumarchitecture.com")

EMAIL_RE = re.compile(r"^[^\s@]+@[^\s@]+\.[^\s@]+$")


def _build_html(name: str, email: str, company: str, message: str) -> str:
    safe_msg = message.replace("\n", "<br/>")
    return f"""
    <table width="100%" cellpadding="0" cellspacing="0" style="font-family: -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif; color:#202123; max-width:640px;">
      <tr><td style="padding:16px 0; border-bottom:2px solid #31c17c;">
        <h2 style="margin:0; font-size:20px; color:#3a506b;">New contact form submission</h2>
      </td></tr>
      <tr><td style="padding:16px 0;">
        <p style="margin:0 0 8px;"><strong>Name:</strong> {name}</p>
        <p style="margin:0 0 8px;"><strong>Email:</strong> <a href="mailto:{email}" style="color:#3a506b;">{email}</a></p>
        <p style="margin:0 0 8px;"><strong>Company:</strong> {company or '-'}</p>
        <p style="margin:16px 0 8px;"><strong>Message:</strong></p>
        <div style="padding:12px 16px; background:#f6f7f9; border-left:3px solid #31c17c;">{safe_msg}</div>
      </td></tr>
      <tr><td style="padding:16px 0; color:#7a7a7a; font-size:12px;">
        Sent from maanumarchitecture.com contact form
      </td></tr>
    </table>
    """


from http.server import BaseHTTPRequestHandler


class handler(BaseHTTPRequestHandler):
    def _respond(self, status: int, payload: dict):
        body = json.dumps(payload).encode()
        self.send_response(status)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(body)))
        self.send_header("Access-Control-Allow-Origin", "*")
        self.end_headers()
        self.wfile.write(body)

    def do_OPTIONS(self):
        self.send_response(204)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.end_headers()

    def do_POST(self):
        length = int(self.headers.get("Content-Length", 0))
        try:
            body = json.loads(self.rfile.read(length) or b"{}")
        except json.JSONDecodeError:
            self._respond(400, {"detail": "Invalid JSON"})
            return

        name = (body.get("name") or "").strip()
        email = (body.get("email") or "").strip()
        company = (body.get("company") or "").strip()
        message = (body.get("message") or "").strip()

        if not name or not message:
            self._respond(400, {"detail": "name and message are required"})
            return
        if not EMAIL_RE.match(email):
            self._respond(400, {"detail": "valid email is required"})
            return
        if len(message) > 5000 or len(name) > 200:
            self._respond(400, {"detail": "field length exceeded"})
            return

        if not resend.api_key:
            # Soft-success in dev so the form UX works before keys are set.
            print(f"[contact] RESEND_API_KEY not set — would have sent: {name} <{email}>")
            self._respond(200, {"status": "queued", "delivered": False})
            return

        params = {
            "from": SENDER_EMAIL,
            "to": [RECIPIENT_EMAIL],
            "reply_to": email,
            "subject": f"New website inquiry from {name}",
            "html": _build_html(name, email, company, message),
        }
        try:
            result = resend.Emails.send(params)
            self._respond(200, {"status": "sent", "delivered": True, "id": result.get("id")})
        except Exception as e:
            print(f"[contact] send failed: {e}")
            self._respond(500, {"detail": f"Email send failed: {e}"})
