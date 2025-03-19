# Python Server with Server-Side Logging

This is a simple Flask server that demonstrates server-side logging similar to the Next.js API routes.

## Setup and Running

1. Activate the virtual environment (already set up):
   ```bash
   source venv/bin/activate
   ```

2. Run the server:
   ```bash
   python server.py
   ```

3. The server will be available at http://localhost:5000/api/hello

## API Endpoints

### GET /api/hello
- Query parameter: `name` (optional)
- Example: http://localhost:5000/api/hello?name=YourName

### POST /api/hello
- Requires JSON body with `name` field
- Example body: `{"name": "YourName"}`

## Server Logs

The server will log detailed information about incoming requests in the terminal, including:
- Request type and timestamp
- Request parameters and body
- URL and headers information

This makes it easy to see that processing is happening on the server side.

## Testing

You can test the API using tools like:
- Browser: Visit http://localhost:5000/api/hello or http://localhost:5000/api/hello?name=YourName
- Curl: `curl http://localhost:5000/api/hello?name=YourName`
- POST example: `curl -X POST -H "Content-Type: application/json" -d '{"name":"YourName"}' http://localhost:5000/api/hello`
- Postman or similar API testing tools

## Troubleshooting

If you see a "Not Found" error:
- Make sure you're using the correct URL path (/api/hello)
- Check that the server is running (look for the "Python Server starting" message in the terminal) 