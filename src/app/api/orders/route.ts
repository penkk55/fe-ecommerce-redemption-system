export async function POST(request: Request) {
    const backendUrl = process.env.BACKEND_ENDPOINT;
  console.log('fffffffss');
  
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
  
      // Validate the request body (optional, can add more checks here)
      if (!body.customerId || !Array.isArray(body.products) || typeof body.total !== 'number') {
        return new Response(
          JSON.stringify({ error: 'Invalid request payload' }),
          { status: 400, headers: { 'Content-Type': 'application/json' } }
        );
      }
  
      // Construct the full URL to your backend
      const fullUrl = `${backendUrl}orders`;
      console.log('body--->',body);
      console.log('fullUrl--->',fullUrl);
  
      // Send data to the actual backend
      const response = await fetch(fullUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body), // Pass the request payload to the backend
      });
//   console.log('response--->',response);
  
    //   // Check if the backend response is OK
    //   if (!response.ok) {
    //     throw new Error(`Failed to create order: ${response.statusText}`);
    //   }
  
      // Parse the JSON response from the backend
      const data = await response.json();
      console.log('data--->',data);
  
      // Return the backend's response to the frontend
      return new Response(JSON.stringify(data), {
        status: 201,
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (error) {
      // Handle errors (e.g., backend is down, invalid JSON, fetch fails)
      console.error('Error creating order:', error);
      return new Response(
        JSON.stringify({ error: 'Failed to create order' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }
  }
  





  export async function GET() {
    const backendUrl = process.env.BACKEND_ENDPOINT;
  console.log('backendUrlbackendUrl--->',backendUrl);
  
    // Check if the environment variable is set
    if (!backendUrl) {
      return new Response(
        JSON.stringify({ error: 'BACKEND_ENDPOINT is not defined' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }
  
    try {
      // Construct the full URL to your backend
      const fullUrl = `${backendUrl}orders`;
  
      // Fetch data from the actual backend
      const response = await fetch(fullUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      
    //   // Check if the response is OK
    //   if (!response.ok) {
    //     throw new Error(`Failed to fetch data: ${response.statusText}`);
    //   }
  
      // Parse the JSON response from the actual backend
      const data = await response.json();
  
      // Return the fetched data as the response to the frontend
      return new Response(JSON.stringify(data), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      // Handle errors (e.g., backend is down or fetch fails)
      console.error('Error fetching data:', error);
      return new Response(
        JSON.stringify({ error: 'Failed to fetch orders' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }
  }