export default function LoadingSpinner() {
  return (
    <div className="w-full h-full text-center flex items-center justify-center gap-4">
      <span
        role="status"
        aria-label="Loading..."
        className="inline-block w-12 h-12 rounded-full border-2 border-t-2 border-gray-300 border-t-blue-600 animate-spin"
      ></span>
      <span
        role="status"
        aria-label="Loading..."
        className="inline-block w-12 h-12 rounded-full border-2 border-t-2 border-gray-300 border-t-green-600 animate-spin"
      ></span>
      <span
        role="status"
        aria-label="Loading..."
        className="inline-block w-12 h-12 rounded-full border-2 border-t-2 border-gray-300 border-t-yellow-600 animate-spin"
      ></span>
      <span
        role="status"
        aria-label="Loading..."
        className="inline-block w-12 h-12 rounded-full border-2 border-t-2 border-gray-300 border-t-red-600 animate-spin"
      ></span>
    </div>
  );
}
