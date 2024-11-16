import Chat from "@/models/Chat";
import User from "@/models/User";
import dbConnect from "@/db";
import { NextRequest, NextResponse } from "next/server";
import Message from "@/models/Message";

export const GET = async (
  req: NextRequest,
  { params }: { params: { userId: string } }
) => {
  try {
    await dbConnect();
    const userId = params.userId;

    const allChats = await Chat.find({ members: userId })
      .sort({ updatedAt: -1 })
      .populate({ path: "members", model: User })
      .populate({
        path: "messages",
        model: Message,
        populate: {
          path: "sender seenBy",
          model: User,
        },
      })
      .exec();

    return NextResponse.json(allChats, { status: 200 });
  } catch (error) {
    console.error(error);
    return new NextResponse("failed to get chats of current user", {
      status: 500,
    });
  }
};
