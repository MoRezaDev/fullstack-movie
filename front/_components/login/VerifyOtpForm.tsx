"use client";

import { verifyOtp } from "@/_lib/auth-api";
import { verifyOtpProps } from "@/_types/auth.types";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { toast } from "sonner";
import ResendButton from "./ResendButton";

export default function VerifyOtpForm({
  data,
  onResendSuccess,
}: verifyOtpProps) {
  const codeRef = useRef<HTMLInputElement>(null);

  const router = useRouter();

  const mutation = useMutation({
    mutationKey: ["verifyOtp"],
    mutationFn: verifyOtp,
    onSuccess: () => {
      toast.success(
        "success!, you will  be redirected to home page in 3 seconds"
      );
      setTimeout(() => {
        router.push("/");
      }, 3000);
    },

    onError: (err) => {
      toast.error(err.message);
    },
  });

  function verifySubmitHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const newData = {
      mobile: data.mobile,
      code: codeRef.current?.value || "",
    };

    mutation.mutate(newData);
  }

  return (
    <div className="max-w-md mx-auto flex flex-col gap-4 p-6 border rounded-lg shadow-sm  ">
      <form onSubmit={verifySubmitHandler} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <label className="text-gray-700 font-medium">Enter your Code</label>
          <input
            ref={codeRef}
            defaultValue={data.code}
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
      </form>
      <ResendButton onResendSuccess={onResendSuccess} data={data} />
    </div>
  );
}
