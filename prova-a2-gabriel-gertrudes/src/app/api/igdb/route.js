import axios from 'axios';

export async function POST(req) {
  try {
    const body = await req.json();
    const response = await axios.post(
      'https://api.igdb.com/v4/games',
      body.query,
      {
        headers: {
          'Client-ID': process.env.NEXT_PUBLIC_CLIENT_ID,
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`,
        },
      }
    );
    return new Response(JSON.stringify(response.data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Erro ao buscar dados da API IGDB:', error);
    return new Response(JSON.stringify({ message: 'Erro ao buscar dados da API IGDB' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
