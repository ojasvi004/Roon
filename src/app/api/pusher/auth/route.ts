import { NextRequest } from "next/server";
import { pusherServer } from "@/lib/pusher";

export async function POST(req: NextRequest) {
  try {
    const { socket_id, channel_name } = await req.json();
    
    const auth = pusherServer.authorizeChannel(socket_id, channel_name);
    
    return new Response(JSON.stringify(auth), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Pusher auth error:', error);
    return new Response('Unauthorized', { status: 401 });
  }
}
