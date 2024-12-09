import User from '@/models/User';
import dbConnect from '@/db';
import { NextRequest, NextResponse } from 'next/server';

export const PATCH = async (req: NextRequest, { params }) => {
  try {
    await dbConnect();
    const { userId } = params;
    const body = await req.json();
    const { username, profileImage } = body;
    console.log('usernameee:', username);
    console.log('pfp:', profileImage);
    console.log('userId:', userId);

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { username, profileImage },
      { new: true }
    );

    if (!updatedUser) {
      return new NextResponse(JSON.stringify('user not founddd'), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new NextResponse(JSON.stringify(updatedUser), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: 'failed to update', details: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
