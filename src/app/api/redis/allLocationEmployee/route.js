// import { getAllLocationEmployee } from '@/api/redis/allLocationEmployee';

// export async function GET() {
//   try {
//     const data = await getAllLocationEmployee();
//     return new Response(JSON.stringify(data), { status: 200, headers: { 'Content-Type': 'application/json' } });
//   } catch (error) {
//     console.error('API Route Error:', error);
//     return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
//   }
// }
import { NextResponse } from 'next/server';
import { getAllLocationEmployee } from '@/lib/redisClient'; // Adjust the path if necessary

export async function GET() {
  try {
    const data = await getAllLocationEmployee(); 
    // Fetch data using the cache function
    return NextResponse.json(data); // Return the data as JSON
  } catch (error) {
    console.error('Error fetching allLocationEmployee data:', error);
    return NextResponse.error(); // Handle errors
  }
}
