import {
  PhoneNumberValidationSchema,
  VerifyCodeValidationSchema,
} from "./validation.zod";

export async function getUserSession() {
  const response = await fetch(`${import.meta.env.VITE_BASE_URL}/auth/session`, {
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) {
    return {
      error: data.error || "Invalid credentials",
    };
  }

  return data;
}

export async function sendOtp(mobile: string) {
  const validated = PhoneNumberValidationSchema.safeParse({ mobile });

  if (!validated.success) throw new Error(validated.error.issues[0].message);

  const response = await fetch(`${import.meta.env.VITE_BASE_URL}/auth/send-otp`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ mobile }),
  });

  const data = await response.json();
  console.log("dt", data);

  if (!response.ok) throw new Error(data.message ?? "لطفا دوباره تلاش کنید");

  return data;
}

export async function verifyOtp({
  code,
  mobile,
}: {
  code: string;
  mobile: string;
}) {
  const validated = VerifyCodeValidationSchema.safeParse({ code });

  if (!validated.success) throw new Error(validated.error.issues[0].message);

  const response = await fetch(`${import.meta.env.VITE_BASE_URL}/auth/check-otp`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ code, mobile }),
  });

  const data = await response.json();

  console.log(data);

  if (!response.ok) throw new Error(data.message ?? "لطفا دوباره تلاش کنید");

  return data;
}
