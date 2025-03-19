import { NextRequest, NextResponse } from 'next/server';

/**
 * GET handler for the /api/hello endpoint
 * 
 * This function processes GET requests sent to the /api/hello route in Next.js.
 * It extracts query parameters from the URL and returns a personalized greeting.
 * 
 * @param request - The incoming Next.js request object
 * @returns A JSON response containing a greeting message
 */
export async function GET(request: NextRequest) {
  // Extract query parameters from the request URL
  // NextRequest provides a 'nextUrl' object with a 'searchParams' property (similar to URLSearchParams)
  const searchParams = request.nextUrl.searchParams;
  
  // Get the 'name' parameter from the query string, defaulting to 'Friend' if not provided
  // Example: /api/hello?name=John would set name to "John"
  const name = searchParams.get('name') || 'Friend';

  // Log detailed information about the request for debugging/demonstration purposes
  // This helps visualize what's happening on the server side
  console.log('\n=== SERVER-SIDE REQUEST PROCESSING ===');
  console.log(`🖥️  Processing GET request on the server at: ${new Date().toLocaleTimeString()}`);
  console.log(`📨 Request params: name = "${name}"`);
  console.log(`🌐 Request URL: ${request.url}`);
  console.log(`🔍 Request headers: ${JSON.stringify({
    'user-agent': request.headers.get('user-agent'),
    'accept': request.headers.get('accept')
  }, null, 2)}`);
  console.log('=======================================\n');
  
  // Return a JSON response with:
  // - message: personalized greeting
  // - timestamp: current time in ISO format
  // - processedOn: indicator that this was processed by the server
  return NextResponse.json({ 
    message: `Hello, ${name}!`,
    timestamp: new Date().toISOString(),
    processedOn: 'nextjs'  // Modified to clearly identify which API processed the request
  });
}

/**
 * POST handler for the /api/hello endpoint
 * 
 * This function processes POST requests to the /api/hello route.
 * It extracts a name from the request body and returns a personalized greeting.
 * Includes error handling for missing name parameter or invalid JSON.
 * 
 * @param request - The incoming Next.js request object
 * @returns A JSON response containing a greeting message or error details
 */
export async function POST(request: NextRequest) {
  try {
    // Log server-side processing information
    console.log('\n=== SERVER-SIDE REQUEST PROCESSING ===');
    console.log(`🖥️  Processing POST request on the server at: ${new Date().toLocaleTimeString()}`);
    
    // Parse the JSON body from the request
    // This is an asynchronous operation, so we use await
    const body = await request.json();
    
    // Extract the name property from the request body using destructuring
    // Example body: { "name": "John" }
    const { name } = body;
    
    // Log request details for debugging/demonstration
    console.log(`📦 Request body: ${JSON.stringify(body, null, 2)}`);
    console.log(`🌐 Request URL: ${request.url}`);
    console.log('=======================================\n');
    
    // Validate that the name parameter exists
    if (!name) {
      // If name is missing, log an error and return a 400 Bad Request response
      console.log('❌ Error: Name is required');
      return NextResponse.json(
        { error: 'Name is required' },
        { status: 400 }  // Sets HTTP status code to 400 Bad Request
      );
    }
    
    // If validation passes, return a success response with the greeting
    return NextResponse.json({ 
      message: `Hello, ${name}!`,
      timestamp: new Date().toISOString(),
      processedOn: 'nextjs'  // Modified to clearly identify which API processed the request
    });
  } catch (error) {
    // Handle any exceptions during request processing
    // This could happen if the request body isn't valid JSON
    console.error('❌ Error in POST route:', error);
    return NextResponse.json(
      { error: 'Invalid request body' },
      { status: 400 }
    );
  }
} 