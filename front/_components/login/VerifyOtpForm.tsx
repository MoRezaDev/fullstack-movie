"use client";

import { useEffect, useState } from "react";

type verifyOtpProps = {
  data: any;
};

export default function VerifyOtpForm({ data }: verifyOtpProps) {
  console.log(data);
  return (
    <form className="flex flex-col gap-4 p-6 border rounded-lg shadow-sm bg-white max-w-md mx-auto">
      <div className="flex flex-col gap-1">
        <label className="text-gray-700 font-medium">Enter your Code</label>
        <input
          type="text"
          placeholder="123456"
          className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
        />
      </div>

      <button
        type="submit"
        className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-md transition"
      >
        Verify OTP
      </button>
      <span>code is {data.code}</span>
      <ResendCodeTimer />
    </form>
  );
}

function ResendCodeTimer() {
  const [val, setVal] = useState(60);

  useEffect(() => {
    if (val === 0) return;
    const timer = setInterval(() => {
      setVal((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  });
  return (
    <div className="text-sm text-gray-500 text-center">
      Resend code in{" "}
      <span className="font-semibold text-gray-700">00:{val}</span>
    </div>
  );
}
