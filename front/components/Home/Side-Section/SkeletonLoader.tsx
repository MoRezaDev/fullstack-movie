export default function SkeletonLoader() {
  return (
    <div className="p-2 bg-neutral-800 rounded-md animate-pulse space-y-2">
      {/* Title / heading */}
      <div className="h-4 bg-neutral-700 rounded w-3/4"></div>

      {/* Subtitle / info */}
      <div className="h-3 bg-neutral-700 rounded w-1/2"></div>

      {/* Optional content line */}
      <div className="h-3 bg-neutral-700 rounded w-full"></div>
    </div>
  );
}
