"""Vercel serverless function: GROQ proxy for Sanity.

Routed at /api/sanity. Mirrors the FastAPI version in backend/server.py.
Avoids browser CORS by querying Sanity server-side.
"""
import json
import os
from urllib.parse import urlencode
from urllib.request import Request, urlopen
from urllib.error import HTTPError, URLError

SANITY_PROJECT_ID = os.environ.get("SANITY_PROJECT_ID", "6raq5w4t")
SANITY_DATASET = os.environ.get("SANITY_DATASET", "production")
SANITY_API_VERSION = os.environ.get("SANITY_API_VERSION", "2024-01-01")
SANITY_READ_TOKEN = os.environ.get("SANITY_READ_TOKEN", "")


from http.server import BaseHTTPRequestHandler


class handler(BaseHTTPRequestHandler):
    def _respond(self, status: int, payload: dict):
        body = json.dumps(payload).encode()
        self.send_response(status)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(body)))
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Cache-Control", "public, max-age=60, s-maxage=60")
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

        query = body.get("query")
        params = body.get("params") or {}
        if not query or not isinstance(query, str):
            self._respond(400, {"detail": "Missing 'query'"})
            return

        qs = {"query": query}
        for k, v in params.items():
            qs[f"${k}"] = json.dumps(v)

        url = (
            f"https://{SANITY_PROJECT_ID}.api.sanity.io"
            f"/v{SANITY_API_VERSION}/data/query/{SANITY_DATASET}?{urlencode(qs)}"
        )

        req = Request(url, method="GET")
        if SANITY_READ_TOKEN:
            req.add_header("Authorization", f"Bearer {SANITY_READ_TOKEN}")

        try:
            with urlopen(req, timeout=15) as resp:
                data = json.loads(resp.read())
            self._respond(200, {"result": data.get("result")})
        except HTTPError as e:
            self._respond(502, {"detail": f"Sanity returned {e.code}: {e.read().decode(errors='replace')[:200]}"})
        except URLError as e:
            self._respond(502, {"detail": f"Sanity unreachable: {e.reason}"})
        except Exception as e:
            self._respond(500, {"detail": f"Proxy error: {e}"})
