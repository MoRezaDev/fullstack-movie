"use client";

import { useSession } from "@/_hooks/useSession";
import React from "react";

export default function ProfileNav() {
  const { data, isLoading, isError } = useSession();
  if (isLoading) return <div>loading...</div>;

  if (isError) {
    return (
      <div>
        <button>Login</button>
        <button>Sign up</button>
      </div>
    );
  }

  return (
    <div>
      <span>test!</span>
    </div>
  );
}
