"use server";
import { signIn } from "../auth";
import { LoginSchema } from "../schema";
import * as z from "zod";
import { AuthError } from "next-auth";
import { DEFAULT_REDIRECT_URL } from "../auth-config";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validateFields = LoginSchema.safeParse(values);
  if (!validateFields.success) {
    return { error: "Invalid Fields" };
  }

  const { email, password } = validateFields.data;
  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_REDIRECT_URL,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid creditenials" };

        default:
          return { error: "Something Went Wriong" };
      }
    }
    throw error;
  }
};
