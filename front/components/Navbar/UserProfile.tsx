import { getUserSession } from "@/lib/actions";
import Link from "next/link";
import React from "react";
import SearchBar from "./SearchBar";

export default async function UserProfile() {
  // const session = await getUserSession();
  const session = { image: null };

  if (!session)
    return (
      <div className="flex gap-2">
        <Link
          href="/login"
          className="bg-blue-500 py-2 px-4 rounded-md transition cursor-pointer hover:opacity-70"
        >
          ورود
        </Link>
        <Link
          className="bg-blue-500 py-2 px-4 rounded-md transition cursor-pointer hover:opacity-70"
          href="/signup"
        >
          ثبت نام
        </Link>
        <Link
          className="bg-amber-400 py-2 px-4 rounded-md transition cursor-pointer hover:opacity-70"
          href={"/vip"}
        >
          خرید اشتراک
        </Link>
      </div>
    );
  return (
    <div className="flex gap-4 items-center">
      <div className="flex items-center gap-2 border-2 py-1 px-2 rounded-md border-neutral-700">
        <Link href={"/profile"}>
          <img
            className="size-[40px] rounded-full"
            src={session.image ?? "/avatar.jpg"}
          />
        </Link>
        <Link
          className="bg-amber-400 flex items-center justify-center py-2 px-4 rounded-md transition cursor-pointer hover:opacity-70"
          href={"/vip"}
        >
          خرید اشتراک
        </Link>
      </div>
    </div>
  );
}
