// components/ErrorPage.tsx

export default function ErrorPage() {
  return (
    <div className="h-screen flex flex-col justify-center items-center bg-neutral-900 text-white p-4 text-center">
      <h1 className="text-4xl font-bold mb-4">💥 خطا رخ داده!</h1>

      <button
        onClick={() => (window.location.href = "/")}
        className="mt-6 bg-white text-black px-4 py-2 rounded hover:bg-gray-200 transition"
      >
        برگشت به خانه
      </button>
    </div>
  );
}
