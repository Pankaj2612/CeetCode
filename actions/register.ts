"use server";

import { RegisterSchema } from "../schema";
import * as z from "zod";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { getUserByEmail } from "../data/user";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validateFields = RegisterSchema.safeParse(values);
  if (!validateFields.success) {
    return { error: "Invalid Fields" };
  }

  const { email, password, name } = validateFields.data;
  const hashedPass = await bcrypt.hash(password, 10);

  const existinguser = await getUserByEmail(email);

  if (existinguser) {
    return { error: "Email Already in Use" };
  }

  await db.user.create({
    data: {
      name,
      email,
      password: hashedPass,
    },
  });

  return { success: "User Created" };
};
