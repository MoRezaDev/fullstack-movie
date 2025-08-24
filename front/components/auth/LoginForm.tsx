"use client";

import { useActionState, useEffect, useState } from "react";
import { toast, Toaster } from "sonner";
import { cn } from "@/lib/functions";
import { sendOtpAction, verifyOtpAction } from "@/lib/actions";

export default function LoginForm() {
  // const [sendPhoneNumberState, setSendPhoneNumberState] = useState(true);
  const [state, phoneAction, phonePending] = useActionState(sendOtpAction, {
    data: {},
    isSuccess: false,
  });
  const [verifyState, verifyAction, verifyPending] = useActionState(
    verifyOtpAction,
    { error: "" }
  );

  console.log(state);

  useEffect(() => {
    if (state.error) {
      toast.error(state.error);
    }
  }, [state]);

  useEffect(() => {
    if (verifyState.error) {
      toast.error(verifyState.error);
    }
  }, [verifyState]);

  console.log("verifyState", verifyState);

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-900 px-4">
      <Toaster />
      {!state.isSuccess ? (
        <form
          action={phoneAction}
          className="bg-neutral-800 w-full max-w-sm p-6 rounded-xl shadow-lg space-y-4"
        >
          <h2 className="text-center text-2xl font-semibold text-white">
            ورود / ثبت نام
          </h2>
          <p className="text-center text-sm text-gray-400">
            شماره همراه خود را وارد کنید تا کد ارسال شود
          </p>

          <div>
            <label className="block mb-1 text-sm text-gray-300">
              شماره همراه
            </label>
            <input
              name="phone"
              type="text"
              className="bg-neutral-700 p-3 w-full rounded-lg outline-none text-sm border border-neutral-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition placeholder:text-gray-400"
              placeholder="مثال: 09123456789"
            />
          </div>

          <button
            disabled={phonePending}
            type="submit"
            className="bg-gradient-to-r from-blue-500 to-indigo-500 w-full py-2.5 rounded-lg font-medium text-white hover:shadow-lg hover:opacity-90 transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {phonePending ? "⏳ درحال ارسال..." : "ارسال کد"}
          </button>
        </form>
      ) : (
        <form
          action={verifyAction}
          className="bg-neutral-800 w-full max-w-sm p-6 rounded-xl shadow-lg space-y-4"
        >
          <h2 className="text-center text-2xl font-semibold text-white">
            تایید کد
          </h2>
          <p className="text-center text-sm text-gray-400">
            کدی که برای شماره {state.data.mobile ?? ""} ارسال شده را وارد کنید
          </p>

          <div className="bg-blue-500/20 border border-blue-400 text-blue-300 p-3 text-xs rounded-lg">
            کد تست: {state.data.code ?? ""}
          </div>

          <div>
            <label className="block mb-1 text-sm text-gray-300">
              کد فعال‌سازی
            </label>
            <input
              name="code"
              type="text"
              className="bg-neutral-700 p-3 w-full rounded-lg outline-none text-sm border border-neutral-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition placeholder:text-gray-400 tracking-widest text-center"
              placeholder="----"
            />
            <input value={state.data.mobile} type="hidden" name="mobile" />
          </div>

          <button
            disabled={verifyPending}
            type="submit"
            className={cn(
              "bg-gradient-to-r from-blue-500 to-indigo-500 w-full py-2.5 rounded-lg font-medium text-white hover:shadow-lg hover:opacity-90 transition disabled:opacity-60 disabled:cursor-not-allowed",
              verifyPending && "bg-neutral-700/20"
            )}
          >
            {verifyPending ? "⏳ درحال تایید..." : "ورود"}
          </button>
        </form>
      )}
    </div>
  );
}
