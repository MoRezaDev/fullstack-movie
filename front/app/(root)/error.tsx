"use client";

export default function ErrorPage({
  error,
  reset,
}: {
  error: TypeError;
  reset: () => void;
}) {
  return (
    <div className="w-full h-[100dvh] text-white flex flex-col items-center justify-center gap-2">
      <p>مشکلی رخ داده </p>
      <p>{error.message}</p>
      <button
        className="bg-blue-500 py-2 px-4 rounded-sm cursor-pointer"
        onClick={() => reset()}
      >
        درخواست دوباره
      </button>
    </div>
  );
}
