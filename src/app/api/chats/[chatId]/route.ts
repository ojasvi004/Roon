import dbConnect from "@/db";
import Chat from "@/models/Chat";
import User from "@/models/User";
import { NextResponse, NextRequest } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: { chatId: string } }
) => {
  try {
    await dbConnect;
    const { chatId } = params;

    const response = await Chat.findById(chatId)
      .populate({
        path: "members",
        model: User,
      })
      .exec();

    return new NextResponse(JSON.stringify(response), { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse("failed to get chat details", { status: 500 });
  }
};
