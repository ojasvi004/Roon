import { NextResponse } from "next/server";
import dbConnect from "@/db";
import User from "@/models/User";

export const GET = async () => {
  try {
    await dbConnect();
    const allUsers = await User.find({});
    return NextResponse.json(allUsers, { status: 200 });
  } catch (error) {
    return new NextResponse("failed to get all users", { status: 500 });
  }
};
