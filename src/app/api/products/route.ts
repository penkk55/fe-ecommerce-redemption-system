// app/api/products/route.ts
export async function GET() {
  const backendUrl = process.env.BACKEND_ENDPOINT;
console.log('backendUrlbackendUrl',backendUrl);

  // Check if the environment variable is set
  if (!backendUrl) {
    return new Response(
      JSON.stringify({ error: 'BACKEND_ENDPOINT is not defined' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }

  try {
    // Construct the full URL to your backend
    const fullUrl = `${backendUrl}products?offset=0&limit=10`;

    // Fetch data from the actual backend
    const response = await fetch(fullUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    
    // Check if the response is OK
    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }

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
      JSON.stringify({ error: 'Failed to fetch products' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
