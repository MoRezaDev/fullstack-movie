"use client";
import { sendOtp } from "@/_lib/auth-api";
import { useMutation } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

export default function ResendButton({
  onResendSuccess,
  data,
}: {
  data: any;
  onResendSuccess: (data: any) => void;
}) {
  const [seconds, setSeconds] = useState(5);

  const resendMutation = useMutation({
    mutationFn: sendOtp,
    onSuccess: (data) => {
      toast.success("OTP sent successfully!");
      onResendSuccess(data);
    },
  });

  function clickHandler() {
    resendMutation.mutate(data.mobile);
    setSeconds(5);
  }

  useEffect(() => {
    if (seconds === 0) return;
    const interval = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [seconds]);

  const content =
    seconds === 0 ? (
      <button onClick={clickHandler}>Resend</button>
    ) : (
      <div>Resend In {`${seconds} seconds`}</div>
    );
  return content;
}
