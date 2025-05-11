"use client";
import SendOtpForm from "@/_components/login/SendOtpForm";
import VerifyOtpForm from "@/_components/login/VerifyOtpForm";
import { useSession } from "@/_hooks/useSession";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Toaster } from "sonner";

export default function LoginPage() {
  const [showVerifyOtpPage, setShowVerifyOtpPage] = useState(false);
  const [data, setData] = useState({
    mobile: "",
    code: "",
    expire_date: "",
  });

  const { data: sessionData, isPending } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!isPending && sessionData) {
      router.replace("/");
    }
  }, [isPending, sessionData, router]);

  if (isPending) return <div>loading...</div>;

  return (
    <div className="mt-10">
      <Toaster richColors closeButton duration={4000} position="top-center" />
      {showVerifyOtpPage ? (
        <VerifyOtpForm
          data={data}
          onResendSuccess={(data: any) => {
            setData(data);
          }}
        />
      ) : (
        <SendOtpForm
          onSuccess={(data: any) => {
            setShowVerifyOtpPage(true);
            setData(data);
          }}
        />
      )}
    </div>
  );
}
