import { cookies } from "next/headers";
import "server-only";

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
    credentials: "include",
  });

  const data = await response.json();
  if (!response.ok) return null;
  return data;
}
