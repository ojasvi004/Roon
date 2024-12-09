import dbConnect from '@/db';
import Chat from '@/models/Chat';
import Message from '@/models/Message';
import User from '@/models/User';
import { NextResponse, NextRequest } from 'next/server';

export async function GET(request: Request, { params }) {
  try {
    await dbConnect();
    const { chatId } = params;

    const response = await Chat.findById(chatId)
      .populate({
        path: 'members',
        model: User,
      })
      .populate({
        path: 'messages',
        model: Message,
        populate: {
          path: 'sender seenBy',
          model: User,
        },
      })
      .exec();

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'Failed to get chat details' },
      { status: 500 }
    );
  }
}

export const POST = async (req: NextRequest, { params }): Promise<Response> => {
  try {
    await dbConnect();

    const { chatId } = params;
    const body = await req.json();

    const { currentUserId } = body;

    await Message.updateMany(
      { chat: chatId },
      { $addToSet: { seenBy: currentUserId } },
      { new: true }
    )
      .populate({
        path: 'sender seenBy',
        model: User,
      })
      .exec();

    return new Response('seen all messages by current user', { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response('failed to update seen messages', { status: 500 });
  }
};
