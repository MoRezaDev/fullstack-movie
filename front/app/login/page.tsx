"use client";
import SendOtpForm from "@/_components/login/SendOtpForm";
import VerifyOtpForm from "@/_components/login/VerifyOtpForm";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { useState } from "react";
import { Toaster } from "sonner";

export default function LoginPage() {
  const [showVerifyOtpPage, setShowVerifyOtpPage] = useState(false);
  const [data, setData] = useState({
    mobile: "",
    code: "",
    expire_date: "",
  });
  return (
    <QueryClientProvider client={new QueryClient()}>
      <div className="mt-10">
        <Toaster richColors closeButton duration={4000} position="top-center" />
        {showVerifyOtpPage ? (
          <VerifyOtpForm data={data} />
        ) : (
          <SendOtpForm
            onSuccess={(data: any) => {
              setShowVerifyOtpPage(true);
              setData(data);
            }}
          />
        )}
      </div>
    </QueryClientProvider>
  );
}
