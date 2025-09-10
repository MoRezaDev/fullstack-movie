import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { cache } from "react";
import "server-only";

export const getUserSession = cache(async () => {
  // await new Promise((resolve) => setTimeout(resolve, 4000));
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (!token) return null;
  const response = await fetch(`${process.env.BASE_URL}/auth/session`, {
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
});

export async function getUserSessionAndAuth() {
  const session = await getUserSession();
  if (!session) return redirect("/login");
  return session;
}
