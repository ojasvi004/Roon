import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const envVars = {
    PUSHER_APP_ID: process.env.PUSHER_APP_ID ? 'SET' : 'NOT SET',
    NEXT_PUBLIC_PUSHER_APP_KEY: process.env.NEXT_PUBLIC_PUSHER_APP_KEY ? 'SET' : 'NOT SET',
    PUSHER_SECRET: process.env.PUSHER_SECRET ? 'SET' : 'NOT SET',
    pusherAppKey: process.env.NEXT_PUBLIC_PUSHER_APP_KEY || 'undefined',
  };

  return new Response(JSON.stringify(envVars, null, 2), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}
