import User from "@/models/User";
import dbConnect from "@/db";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import DOMPurify from "dompurify";
import { z } from "zod";

const userSchema = z.object({
  username: z
    .string()
    .min(3, "username must be at least 3 characters long")
    .max(20, "username must be at most 20 characters long")
    .optional(),
  email: z.string().email("invalid email format"),
  password: z.string().min(4, "password must be at least 4 characters long"),
});

export const POST = async (req: NextRequest) => {
  try {
    await dbConnect();

    const body = await req.json();
    const result = userSchema.safeParse(body);

    if (!result.success) {
      return new NextResponse(JSON.stringify(result.error.errors), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    let { username, email } = result.data;
    const { password } = result.data;

    username = DOMPurify.sanitize(username || "");
    email = email.trim().toLowerCase();

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return new NextResponse("user already exists", {
        status: 409,
      });
    }

    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    return new NextResponse(JSON.stringify(newUser), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error(err);
    return new NextResponse("failed to create a new user", {
      status: 500,
    });
  }
};
