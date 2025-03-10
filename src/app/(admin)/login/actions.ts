"use server";

import { createSession } from "@/lib/session";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";

const hashedPassword = ("$2b$12$" + process.env.HASHED_PASSWORD) as string;
const adminUser = process.env.ADMIN_USER as string;
const userId = process.env.JWT_USER as string;

export async function login(prevState: any, formdata: FormData) {
  const { username, password } = Object.fromEntries(formdata);

  const isValidUsername = username == adminUser;

  if (!isValidUsername) {
    return {
      errors: {
        message: ["Invalid Credentials. Please try again."],
      },
    };
  }

  const isValidPass = await bcrypt.compare(password as string, hashedPassword);

  if (!isValidPass) {
    return {
      errors: {
        message: ["Invalid Credentials. Please try again."],
      },
    };
  }

  await createSession(userId);
  redirect("/admin/dashboard");
}
