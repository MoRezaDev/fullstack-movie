"use client";

export async function getContents(query: string | null) {
  await new Promise((res) => setTimeout(res, 1000));

  if (!query) {
    throw new Error("لطفا فیلد خالی نگذارید");
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_CLIENT_BASE_URL}/post/search?query=${query}`
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message ?? "Faild to fetch data!");
  }

  return data;
}
