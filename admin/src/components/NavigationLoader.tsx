export default function NavigationLoader() {
  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex flex-col items-center justify-center gap-4">
      <div className="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
      <p className="text-white text-lg font-semibold">لطفا صبر کنید ...</p>
    </div>
  );
}
