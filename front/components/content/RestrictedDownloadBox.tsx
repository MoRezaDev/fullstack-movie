import Link from "next/link";
import React from "react";

export default function RestrictedDownloadBox() {
  return (
    <div className="flex flex-col gap-4 mt-6">
      <div className="rounded-md overflow-hidden bg-neutral-700">
        {/* Header */}
        <div className="p-4  bg-neutral-950 text-xs md:text-sm flex flex-col sm:flex-row items-center gap-4 justify-center">
          <span>برای دریافت لینک دانلود نیاز به اشتراک دارید</span>
          <Link href={"/vip"}>
            <span className="bg-amber-400 rounded-md py-2 px-2">خرید اشتراک</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
