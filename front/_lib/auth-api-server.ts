"use server";

import { cookies } from "next/headers";

async function w8() {
  return new Promise((res) => setTimeout(res, 3000));
}

export async function getServerSession() {
  await w8();
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (!token) {
    return null;
  }

  const res = await fetch("http://localhost:3001/auth/session", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();

  if (!res.ok) {
    return {
      error: data?.message,
      status: data?.statusCode,
      session: null,
    };
  }

  return {
    error: null,
    session: data,
  };
}
