import User from "@/models/User";
import dbConnect from "@/db";
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest, { params }: { params: Promise<{ query: string }> }) => {
  try {
    await dbConnect();

    const { query } = await params;

    const searchedContacts = await User.find({
      $or: [
        { username: { $regex: query, $options: "i" } },
        { email: { $regex: query, $options: "i" } },
      ],
    });

    return new Response(JSON.stringify(searchedContacts), { status: 200 });
  } catch (err) {
    console.error("error searching contact:", err);
    return new Response("failed to search contact", { status: 500 });
  }
};
