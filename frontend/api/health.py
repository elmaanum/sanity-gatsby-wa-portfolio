"""Vercel serverless function: simple health check at /api/health."""
import json
import os
from http.server import BaseHTTPRequestHandler


class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        body = json.dumps({
            "status": "ok",
            "resend_configured": bool(os.environ.get("RESEND_API_KEY")),
            "sanity_project": os.environ.get("SANITY_PROJECT_ID", "6raq5w4t"),
        }).encode()
        self.send_response(200)
        self.send_header("Content-Type", "application/json")
        self.send_header("Access-Control-Allow-Origin", "*")
        self.end_headers()
        self.wfile.write(body)
