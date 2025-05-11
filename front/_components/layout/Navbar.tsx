"use client";

import React, { Suspense } from "react";
import ProfileNav from "./ProfileNav";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ThemeToggle from "@/theme/theme-toggle";

const client = new QueryClient();

async function w8() {
  return new Promise((resolve) => setTimeout(resolve, 3000));
}

export default function Navbar() {
  return (
    <nav className="w-full p-4 dark:bg-black text-white flex justify-between">
      <h1 className="text-2xl">Navbar</h1>
      <QueryClientProvider client={client}>
        <ProfileNav />
        <ThemeToggle />
      </QueryClientProvider>
    </nav>
  );
}
