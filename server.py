from flask import Flask, request, jsonify
import datetime
import json

app = Flask(__name__)

@app.route('/api/hello', methods=['GET'])
def hello_get():
    # Get query parameters
    name = request.args.get('name', 'Friend')
    
    # Enhanced server-side logging of the GET request
    print("\n=== SERVER-SIDE REQUEST PROCESSING ===")
    print(f"🖥️  Processing GET request on the server at: {datetime.datetime.now().strftime('%H:%M:%S')}")
    print(f"📨 Request params: name = \"{name}\"")
    print(f"🌐 Request URL: {request.url}")
    print(f"🔍 Request headers: {json.dumps({
        'user-agent': request.headers.get('User-Agent'),
        'accept': request.headers.get('Accept')
    }, indent=2)}")
    print("=======================================\n")
    
    return jsonify({
        'message': f"Hello, {name}!",
        'timestamp': datetime.datetime.now().isoformat(),
        'processedOn': 'server'
    })

@app.route('/api/hello', methods=['POST'])
def hello_post():
    try:
        # Enhanced server-side logging of the POST request
        print("\n=== SERVER-SIDE REQUEST PROCESSING ===")
        print(f"🖥️  Processing POST request on the server at: {datetime.datetime.now().strftime('%H:%M:%S')}")
        
        # Get JSON body
        body = request.get_json()
        name = body.get('name') if body else None
        
        print(f"📦 Request body: {json.dumps(body, indent=2)}")
        print(f"🌐 Request URL: {request.url}")
        print("=======================================\n")
        
        if not name:
            print("❌ Error: Name is required")
            return jsonify({
                'error': 'Name is required'
            }), 400
        
        return jsonify({
            'message': f"Hello, {name}!",
            'timestamp': datetime.datetime.now().isoformat(),
            'processedOn': 'server'
        })
    except Exception as e:
        print(f"❌ Error in POST route: {str(e)}")
        return jsonify({
            'error': 'Invalid request body'
        }), 400

# Add CORS support to allow requests from the Next.js frontend
@app.after_request
def add_cors_headers(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
    response.headers.add('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
    return response

if __name__ == '__main__':
    print("🚀 Python Server starting on http://localhost:5000")
    print("📝 This server will log requests similar to Next.js API")
    print("📌 You can access the API at:")
    print("   - http://localhost:5000/api/hello")
    print("   - http://localhost:5000/api/hello?name=YourName")
    app.run(debug=True) 