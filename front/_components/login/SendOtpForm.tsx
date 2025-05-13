"use client";

import { sendOtp } from "@/_lib/auth-api";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useRef } from "react";

type sendOtpProps = {
  onSuccess: (data: any) => void;
};

export default function SendOtpForm({ onSuccess }: sendOtpProps) {
  const mobileRef = useRef<HTMLInputElement>(null);

  const mutation = useMutation({
    mutationFn: sendOtp,
  });

  function sendOtpSubmitHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = mobileRef.current?.value || "";
    mutation.mutate(value);
  }

  useEffect(() => {
    if (mutation.isSuccess) {
      onSuccess(mutation.data);
    }
  }, [mutation.isSuccess]);

  return (
    <form
      onSubmit={sendOtpSubmitHandler}
      className="flex flex-col gap-4 p-6 border rounded-lg shadow-sm  max-w-md mx-auto"
    >
      <div className="flex flex-col gap-1">
        <label className="text-gray-700 font-medium">Enter your Mobile</label>
        <input
          onFocus={(e) => {
            mutation.reset();
          }}
          ref={mobileRef}
          type="text"
          placeholder="09xxxxxxxxx"
          className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-sky-400 transition"
        />
      </div>

      <button
        disabled={mutation.isPending}
        type="submit"
        className="bg-sky-500 hover:bg-sky-600 text-white font-semibold py-2 rounded-md transition"
      >
        {!mutation.isPending ? (
          "Send OTP"
        ) : (
          <div className="flex items-center gap-2 justify-center">
            <span>Sending OTP...</span>
            <svg
              className="mr-3 -ml-1 size-5 animate-spin text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth={4}
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </div>
        )}
      </button>
      {mutation.isError && (
        <div className="text-red-500">{mutation.error.message}</div>
      )}
    </form>
  );
}
