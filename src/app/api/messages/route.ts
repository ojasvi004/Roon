import dbConnect from "@/db";
import { pusherServer } from "@/lib/pusher";
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
      sender: currentUser,
      text,
      photo,
      seenBy: [currentUserId],
    });

    const populatedMessage = await Message.findById(newMessage._id)
      .populate({
        path: "sender",
        model: User,
        select: "_id username profileImage",
      })
      .populate({
        path: "seenBy",
        model: User,
        select: "_id username profileImage",
      });

    const updatedChat = await Chat.findByIdAndUpdate(
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

    await pusherServer.trigger(chatId, "new-message", populatedMessage);

    const lastMessage = updatedChat.messages[updatedChat?.messages.length - 1];
    
    const memberPromises = updatedChat.members.map(async (member) => {
      try {
        await pusherServer.trigger(member._id.toString(), "update-chat", {
          id: chatId,
          messages: [lastMessage],
          lastMessageAt: newMessage.createdAt,
        });
      } catch (error) {
        console.log(`Failed to trigger update chat event for member ${member._id}:`, error);
      }
    });

    await Promise.all(memberPromises);

    return new Response(JSON.stringify(populatedMessage), { status: 200 });
  } catch (error) {
    console.log("error:", error);
    return new Response("failed to create new message", { status: 500 });
  }
};
