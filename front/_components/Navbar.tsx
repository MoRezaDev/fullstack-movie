import React, { Suspense } from "react";

async function w8() {
  return new Promise((resolve) => setTimeout(resolve, 3000));
}

export default function Navbar() {
  return (
    <nav className="w-full p-4 bg-black text-white flex justify-between">
      <h1 className="text-2xl">Navbar</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <ProfileBtn />
      </Suspense>
    </nav>
  );
}

async function ProfileBtn() {
  await w8();
  return <div>test</div>;
}
