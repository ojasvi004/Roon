import dbConnect from "@/db";
import Chat from "@/models/Chat";
import Message from "@/models/Message";
import User from "@/models/User";
import { NextResponse, NextRequest } from "next/server";

export const GET = async (req: NextRequest, { params }) => {
  try {
    await dbConnect();

    const { userId, query } = params;
    const searchedChat = await Chat.find({
      members: userId,
      name: { $regex: query, $options: "i" },
    })
      .populate({
        path: "members",
        model: User,
      })
      .populate({
        path: "messages",
        model: Message,
        populate: {
          path: "sender seenBy",
          model: User,
        },
      })
      .exec();

    return NextResponse.json(searchedChat, { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse("failed to search chat", { status: 500 });
  }
};
