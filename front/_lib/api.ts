export async function sendOtp(mobile: string) {
  const regex = /^0?9\d{9}$/;
  if (!mobile || !regex.test(mobile)) {
    throw new Error("Invalid mobile number");
  }

  const res = await fetch("http://localhost:3001/auth/send-otp", {
    method: "POST",
    body: JSON.stringify({ mobile }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("Failed to send OTP");
  }

  return res.json();
}
