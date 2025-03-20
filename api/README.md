# API in This Project

This project uses both Next.js API routes and Python serverless functions on Vercel.

## API Structure

### Python API Endpoint
- `/api/python-hello` - Python serverless function that processes GET and POST requests

### Next.js API Endpoint
- `/api/nextjs-hello` - Next.js API route that processes GET and POST requests

## How it works

### In Development
- Next.js API routes work through the Next.js development server
- Python API routes work through Vercel's serverless functions when you use `vercel dev`

### In Production (Vercel)
- The Python serverless function in this `/api` directory is deployed with the `@vercel/python` builder
- The Next.js API route is bundled with the Next.js application
- All routes are handled by Vercel according to the configuration in `vercel.json`

## Testing Both APIs

You can use the homepage form to test both APIs or visit the test page at `/test` to try them out.

## Local Testing with Vercel CLI

For the best local development experience that matches production:

```bash
npm i -g vercel
vercel dev
```

This will run both the Next.js app and the Python functions locally in the same way they'll run on Vercel.

## Requirements

For Python serverless functions:
- `requirements.txt` file is necessary for Vercel to install Python dependencies 