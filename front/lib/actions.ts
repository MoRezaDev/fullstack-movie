"use server";

import { cookies } from "next/headers";
import {
  PhoneNumberValidationSchema,
  VerifyCodeValidationSchema,
} from "./validation.zod";
import { redirect } from "next/navigation";

export async function sendOtpAction(state: any, formData: FormData) {
  const phone = formData.get("phone") as string;
  const validatedPhone = PhoneNumberValidationSchema.safeParse({ phone });

  if (!validatedPhone.success)
    return {
      error: validatedPhone.error.issues[0].message ?? "something wrong!",
    };

  const response = await fetch("http://localhost:3001/auth/send-otp", {
    method: "POST",
    body: JSON.stringify({ mobile: phone }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  if (!response.ok) return { error: data.message ?? "error on fetch!" };
  return { data, isSuccess: true };
}

export async function verifyOtpAction(state: any, formData: FormData) {
  const code = formData.get("code") as string;
  const mobile = formData.get("mobile") as string;

  const validated = VerifyCodeValidationSchema.safeParse({ code });
  if (!validated.success) {
    return { error: validated.error.issues[0].message ?? "something wrong!" };
  }

  const response = await fetch("http://localhost:3001/auth/check-otp", {
    method: "POST",
    body: JSON.stringify({ code, mobile }),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) {
    return { error: data.message ?? "error on fetch!" };
  }

  const cookieStore = await cookies();
  cookieStore.set("token", data.token.token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 24 * 60 * 60 * 1000,
  });

  redirect("/");
}

export async function getUserSession() {
  // await new Promise((resolve) => setTimeout(resolve, 4000));
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (!token) return null;
  const response = await fetch("http://localhost:3001/auth/session", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();
  if (!response.ok) return null;
  return data;
}
