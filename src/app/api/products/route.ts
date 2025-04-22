import data from './data.json';

export async function GET(request: Request) {
 return new Response(JSON.stringify(data.products), {
   status: 200,
   headers: {
     'Content-Type': 'application/json',
     'Cache-Control': 'no-store',
   },
 });
}