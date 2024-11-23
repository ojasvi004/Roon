import dbConnect from "@/db";
import Chat from "@/models/Chat";
import { NextRequest } from "next/server";

export const PATCH = async (
  req: NextRequest,
  { params }: { params: { chatId: string } }
) => {
  try {
    dbConnect();
    const body = await req.json();
    const { chatId } = params;
    const { name, groupPhoto } = body;

    const updatedGroupChat = await Chat.findByIdAndUpdate(
      chatId,

      { name, groupPhoto },
      { new: true }
    );

    return new Response(JSON.stringify(updatedGroupChat), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("failed to update group chat info", { status: 500 });
  }
};
