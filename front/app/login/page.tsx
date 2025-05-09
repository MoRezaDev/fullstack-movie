import React from "react";

export default function LoginPage() {
  return (
    <div className="">
      <form className="max-w-[500px] mx-auto mt-10 border p-4 flex flex-col">
        <label>Enter your Mobile</label>
        <input
          name="mobile"
          className="border border-gray-400 rounded-md outline-none p-1"
          type="text"
        />
        <button className="bg-sky-500 w-fit px-2 py-1 rounded-md">Go</button>
      </form>
    </div>
  );
}
