from http.server import BaseHTTPRequestHandler
import datetime
import json
from urllib.parse import parse_qs

class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        # Parse query parameters
        query_components = parse_qs(self.path.split('?')[1]) if '?' in self.path else {}
        name = query_components.get('name', ['Friend'])[0]
        
        # Log request details (logs appear in Vercel deployment logs)
        print("\n=== PYTHON API PROCESSING ===")
        print(f"🐍 Processing GET request at: {datetime.datetime.now().strftime('%H:%M:%S')}")
        print(f"📨 Request params: name = \"{name}\"")
        print(f"🌐 Request URL: {self.path}")
        print("=======================================\n")
        
        # Send response
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.end_headers()
        
        response_data = {
            'message': f"Hello from Python API, {name}!",
            'timestamp': datetime.datetime.now().isoformat(),
            'processedOn': 'python-api'
        }
        
        self.wfile.write(json.dumps(response_data).encode())
        return

    def do_POST(self):
        # Get request body
        content_length = int(self.headers['Content-Length'])
        post_data = self.rfile.read(content_length)
        
        try:
            body = json.loads(post_data)
            name = body.get('name')
            
            # Log request details
            print("\n=== PYTHON API PROCESSING ===")
            print(f"🐍 Processing POST request at: {datetime.datetime.now().strftime('%H:%M:%S')}")
            print(f"📦 Request body: {json.dumps(body, indent=2)}")
            print(f"🌐 Request URL: {self.path}")
            print("=======================================\n")
            
            if not name:
                print("❌ Error: Name is required")
                self.send_response(400)
                self.send_header('Content-type', 'application/json')
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                self.wfile.write(json.dumps({'error': 'Name is required'}).encode())
                return
            
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.send_header('Access-Control-Allow-Headers', 'Content-Type')
            self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
            self.end_headers()
            
            response_data = {
                'message': f"Hello from Python API, {name}!",
                'timestamp': datetime.datetime.now().isoformat(),
                'processedOn': 'python-api'
            }
            
            self.wfile.write(json.dumps(response_data).encode())
        except Exception as e:
            print(f"❌ Error in POST route: {str(e)}")
            self.send_response(400)
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(json.dumps({'error': 'Invalid request body'}).encode())
    
    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers() 