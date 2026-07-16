#!/usr/bin/env python3
"""Serve the built site locally: python3 serve.py [port]"""
import sys
from functools import partial
from http.server import HTTPServer, SimpleHTTPRequestHandler
from pathlib import Path

SITE = Path(__file__).parent / "site"
port = int(sys.argv[1]) if len(sys.argv) > 1 else 8642


class Handler(SimpleHTTPRequestHandler):
    def send_error(self, code, *args, **kwargs):
        # Serve the custom 404 page for missing paths.
        page = SITE / "404.html"
        if code == 404 and page.exists():
            body = page.read_bytes()
            self.send_response(404)
            self.send_header("Content-Type", "text/html; charset=utf-8")
            self.send_header("Content-Length", str(len(body)))
            self.end_headers()
            try:
                self.wfile.write(body)
            except BrokenPipeError:
                pass
            return
        super().send_error(code, *args, **kwargs)


print(f"Serving {SITE} at http://localhost:{port}")
HTTPServer(("", port), partial(Handler, directory=str(SITE))).serve_forever()
