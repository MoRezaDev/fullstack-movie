import React from "react";
import MainCard from "./MainCard";
import { getAllPosts } from "@/lib/api";

export default async function MainContent() {
  const data = await getAllPosts();
  return (
    <section>
      {/* Advertise */}
      <div className="flex flex-col gap-4">
        <div className="bg-black p-4 rounded-md animate-pulse h-22">
          <span className="text-2xl">Advertise</span>
        </div>
        <div className="bg-black p-4 rounded-md animate-pulse h-22">
          <span className="text-2xl">تبلیغات</span>
        </div>
      </div>

      {/* main card  */}
      <section className="flex flex-col gap-4 mt-8">
        <MainCard data={data} />
      </section>
    </section>
  );
}
