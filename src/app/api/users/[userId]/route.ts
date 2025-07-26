import Chat from '@/models/Chat';
import User from '@/models/User';
import dbConnect from '@/db';
import { NextRequest, NextResponse } from 'next/server';
import Message from '@/models/Message';

export const GET = async (req: NextRequest, { params }) => {
  try {
    await dbConnect();
    const { userId } = await params;

    const allChats = await Chat.find({ members: userId })
      .sort({ lastMessageAt: -1 })
      .populate({ path: 'members', model: User })
      .populate({
        path: 'messages',
        model: Message,
        populate: {
          path: 'sender seenBy',
          model: User,
        },
      })
      .exec();

    return NextResponse.json(allChats, { status: 200 });
  } catch (error) {
    console.error('Error fetching chats:', error);
    return new NextResponse('failed to get chats of current user', {
      status: 500,
    });
  }
};
