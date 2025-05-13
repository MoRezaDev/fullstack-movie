import { IVerifyOtpDto } from "@/_types/auth.types";

export async function sendOtp(mobile: string) {
  console.log("sending otp started!");
  const regex = /^0?9\d{9}$/;
  if (!mobile || !regex.test(mobile)) {
    throw new Error("Invalid mobile number");
  }

  const res = await fetch("http://localhost:3001/auth/send-otp", {
    method: "POST",
    body: JSON.stringify({ mobile }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("Failed to send OTP");
  }

  return res.json();
}

export async function verifyOtp(verifyOtpDto: IVerifyOtpDto) {
  const res = await fetch("http://localhost:3001/auth/check-otp", {
    method: "POST",
    body: JSON.stringify(verifyOtpDto),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Failed to verify OTP");
  }

  return res.json();
}

export async function getSession() {
  const res = await fetch("http://localhost:3001/auth/session", {
    credentials: "include",
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Failed to get session");
  }
  return await res.json();
}
