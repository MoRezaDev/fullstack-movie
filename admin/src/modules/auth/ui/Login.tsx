import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { sendOtp, verifyOtp } from "../../../lib/auth";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import { cn } from "../../../lib/functions";

export default function Login() {
  const [sendPhoneNumberState, setSendPhoneNumberState] = useState(true);
  const navigate = useNavigate();

  const sendPhoneMutation = useMutation({
    mutationFn: (mobile: string) => sendOtp(mobile),
    onError: (error) => {
      toast.error(error.message ?? "مشکلی پیش آمد!");
    },
    onSuccess: (data) => {
      setSendPhoneNumberState(false);
      toast.success(`کد شما: ${data.code}`, { duration: 10000 });
    },
  });

  const verifyCodeMutation = useMutation({
    mutationFn: ({ code, mobile }: { code: string; mobile: string }) =>
      verifyOtp({ code, mobile }),
    onError: (error) => {
      toast.error(error.message ?? "مشکلی پیش آمد!");
    },
    onSuccess: () => {
      toast.success("ورود موفق! درحال انتقال...");
      setTimeout(() => navigate("/"), 3000);
    },
  });

  function submitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    sendPhoneMutation.mutate(formData.get("phone") as string);
  }

  function verifyCodeSubmitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    verifyCodeMutation.mutate({
      code: formData.get("code") as string,
      mobile: formData.get("mobile") as string,
    });
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-900 px-4">
      {sendPhoneNumberState ? (
        <form
          onSubmit={submitHandler}
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
            disabled={sendPhoneMutation.isPending}
            type="submit"
            className="bg-gradient-to-r from-blue-500 to-indigo-500 w-full py-2.5 rounded-lg font-medium text-white hover:shadow-lg hover:opacity-90 transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {sendPhoneMutation.isPending ? "⏳ درحال ارسال..." : "ارسال کد"}
          </button>
        </form>
      ) : (
        <form
          onSubmit={verifyCodeSubmitHandler}
          className="bg-neutral-800 w-full max-w-sm p-6 rounded-xl shadow-lg space-y-4"
        >
          <h2 className="text-center text-2xl font-semibold text-white">
            تایید کد
          </h2>
          <p className="text-center text-sm text-gray-400">
            کدی که برای شماره {sendPhoneMutation.data?.mobile} ارسال شده را وارد
            کنید
          </p>

          <div className="bg-blue-500/20 border border-blue-400 text-blue-300 p-3 text-xs rounded-lg">
            کد تست: {sendPhoneMutation.data?.code}
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
            <input
              type="hidden"
              name="mobile"
              value={sendPhoneMutation.data?.mobile}
            />
          </div>

          <button
            disabled={
              verifyCodeMutation.isPending || verifyCodeMutation.isSuccess
            }
            type="submit"
            className={cn(
              "bg-gradient-to-r from-blue-500 to-indigo-500 w-full py-2.5 rounded-lg font-medium text-white hover:shadow-lg hover:opacity-90 transition disabled:opacity-60 disabled:cursor-not-allowed",
              verifyCodeMutation.isSuccess && "bg-neutral-700/20"
            )}
          >
            {verifyCodeMutation.isPending ? "⏳ درحال تایید..." : "ورود"}
          </button>
        </form>
      )}
    </div>
  );
}
