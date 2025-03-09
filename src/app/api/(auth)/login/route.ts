import bcrypt from "bcrypt";
import cookie, { SerializeOptions } from "cookie";
import jwt from "jsonwebtoken";
import { ApiError } from "next/dist/server/api-utils";
import { NextRequest, NextResponse } from "next/server";

const hashedPassword = ("$2b$12$" + process.env.HASHED_PASSWORD) as string;
const userId = process.env.JWT_USER as string;
const secret_key = process.env.JWT_SECRET_KEY as string;

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();

    if (!username || !password) {
      return NextResponse.json(
        {
          message: "Invalid Credentials",
        },
        { status: 402 }
      );
    }

    const credentails = username + password + username;

    // Compare the entered password with the hashed password stored in the environment variable
    const isPasswordValid = await bcrypt.compare(credentails, hashedPassword);

    if (isPasswordValid) {
      // If password is correct, set a secure session cookie
      const token = jwt.sign({ userId: userId }, secret_key, {
        expiresIn: "2d",
      }); // This could be a JWT or a simple session token

      const cookieOptions: SerializeOptions = {
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: 60 * 60 * 24 * 2,
      };

      // Return a response with the cookie set
      return NextResponse.json(
        { message: "Login successful" },
        {
          headers: {
            "Set-Cookie": cookie.serialize("auth_token", token, cookieOptions),
          },
        }
      );
    }

    return NextResponse.json(
      {
        message: "Invalid Credentials",
      },
      { status: 400 }
    );
  } catch (error) {
    if (error instanceof ApiError) {
      return NextResponse.json({
        message: error.message,
      });
    }
    return NextResponse.json({
      message: "Internal Server Error",
    });
  }
}
