"use server";

import { PhoneNumberValidationSchema } from "./validation.zod";

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
