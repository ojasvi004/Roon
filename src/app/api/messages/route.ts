import dbConnect from "@/db";
import Chat from "@/models/Chat";
import Message from "@/models/Message";
import User from "@/models/User";
import { NextRequest } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    await dbConnect();

    const body = await req.json();
    const { chatId, currentUserId, text, photo } = body;
    const currentUser = await User.findById(currentUserId);
    const newMessage = await Message.create({
      chat: chatId,
      sender: currentUser,
      text,
      photo,
      seenBy: currentUserId,
    });

    const updateChat = await Chat.findByIdAndUpdate(
      chatId,
      {
        $push: { message: newMessage._id },
        $set: { lastMessageAt: newMessage.createdAt },
      },
      { new: true }
    )
      .populate({
        path: "messages",
        model: Message,
        populate: { path: "sender seenBy", model: "User" },
      })
      .populate({
        path: "members",
        model: "User",
      })
      .exec();
  } catch (error) {
    console.log(error);
    return new Response("failed to create new message", { status: 500 });
  }
};
