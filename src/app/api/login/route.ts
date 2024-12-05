export async function POST(request: Request) {
    console.log('Initializing POST request');
    const backendUrl = process.env.BACKEND_ENDPOINT;
  
    
    // Check if the environment variable is set
    if (!backendUrl) {
      return new Response(
        JSON.stringify({ error: 'BACKEND_ENDPOINT is not defined' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }
  
    try {
      // Parse the request body
      const body = await request.json();
  
      // Validate the request body
      if (!body.email) {
        return new Response(
          JSON.stringify({ error: 'Invalid request payload' }),
          { status: 400, headers: { 'Content-Type': 'application/json' } }
        );
      }
  
      // Fetch balance from the backend
      const balanceUrl = `${backendUrl}balance`;
      const balanceResponse = await fetch(balanceUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'email': body.email, // Pass the customerId as the email header
        },
      });
  
      // // Check if the balance response is OK
      // if (!balanceResponse.ok) {
      //   throw new Error(`Failed to fetch balance: ${balanceResponse.statusText}`);
      // }
  
      const balanceData = await balanceResponse.json();
  
      // Validate balance (example logic: ensure balance is sufficient)
     
  
      // Return the backend's response to the frontend
      return new Response(JSON.stringify(balanceData), {
        status: 201,
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (error) {
      console.error('Error processing login request:', error);
      return new Response(
        JSON.stringify({ error: 'Failed to login ' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }
  }
  