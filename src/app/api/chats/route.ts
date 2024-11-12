import dbConnect from "@/db";
import Chat from "@/models/Chat";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    await dbConnect();
    const body = await req.json();
    const { currentUserId, members, isGroup, name, groupPhoto } = body;

    const query = isGroup
      ? { isGroup, name, groupPhoto, members: [currentUserId, ...members] }
      : { members: { $all: [currentUserId, ...members], $size: 2 } };

    let chat = await Chat.findOne(query);

    if (!chat) {
      chat = new Chat(
        isGroup ? query : { members: [currentUserId, ...members] }
      );
      await chat.save();
    }

    await Promise.all(
      chat.members.map(async (memberId) => {
        await User.findByIdAndUpdate(
          memberId,
          { $addToSet: { chats: chat._id } },
          { new: true }
        );
      })
    );

    return NextResponse.json(chat);
  } catch (error) {
    console.log(error);
    return new Response("failed to create new chat", { status: 500 });
  }
};
