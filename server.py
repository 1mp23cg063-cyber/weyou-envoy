#!/usr/bin/env python3
"""
Development server with clean URL support for WeYouX enVoy.
Maps extensionless clean URLs (e.g., /medical, /about, /contact) to .html files,
matching Netlify and production web server routing.
"""

import http.server
import socketserver
import os
import sys

PORT = 8088

class CleanUrlHandler(http.server.SimpleHTTPRequestHandler):
    def translate_path(self, path):
        orig = super().translate_path(path)
        base = orig.rstrip('/\\')

        # 1. If requested exact path is a file, serve it directly (e.g. /blog/blog.js, /style.css)
        if os.path.isfile(orig):
            return orig

        # 2. If a corresponding .html file exists, serve the HTML page
        # This handles clean URLs like /medical -> medical.html, /about -> about.html,
        # AND folder collisions like /blog or /blog/ -> blog.html
        if os.path.isfile(base + '.html'):
            return base + '.html'

        return orig

    def list_directory(self, path):
        # Security: Disable directory listing across all directories
        self.send_error(404, "File not found")
        return None

    def send_error(self, code, message=None, explain=None):
        if code == 404:
            custom_404 = os.path.join(self.directory, '404.html')
            if os.path.isfile(custom_404):
                self.send_response(404)
                self.send_header('Content-Type', 'text/html; charset=utf-8')
                try:
                    with open(custom_404, 'rb') as f:
                        data = f.read()
                    self.send_header('Content-Length', str(len(data)))
                    self.end_headers()
                    self.wfile.write(data)
                    return
                except Exception:
                    pass
        super().send_error(code, message, explain)

    def end_headers(self):
        # Disable caching in local development so changes reflect immediately
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

class ThreadingServer(socketserver.ThreadingMixIn, socketserver.TCPServer):
    daemon_threads = True
    allow_reuse_address = True

def run(port=PORT):
    if len(sys.argv) > 1:
        try:
            port = int(sys.argv[1])
        except ValueError:
            pass

    with ThreadingServer(("", port), CleanUrlHandler) as httpd:
        print(f"=================================================")
        print(f"  enVoy Development Server Running               ")
        print(f"  URL: http://localhost:{port}/                 ")
        print(f"  Clean URLs: Enabled (/medical -> medical.html) ")
        print(f"=================================================")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nServer stopped.")

if __name__ == '__main__':
    run()
