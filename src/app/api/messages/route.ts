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
    if (!currentUser) {
      return new Response("user not found", { status: 404 });
    }

    const newMessage = await Message.create({
      chat: chatId,
      sender: currentUserId,
      text,
      photo,
      seenBy: [currentUserId],
    });

    const updateChat = await Chat.findByIdAndUpdate(
      chatId,
      {
        $push: { messages: newMessage._id },
        $set: { lastMessageAt: newMessage.createdAt },
      },
      { new: true }
    )
      .populate({
        path: "messages",
        model: Message,
        populate: {
          path: "sender seenBy",
          model: User,
        },
      })
      .exec();

    return new Response(JSON.stringify(updateChat), { status: 200 });
  } catch (error) {
    console.log("error:", error);
    return new Response("failed to create new message", { status: 500 });
  }
};
