import AdvancedSearch from "@/components/Home/AdvancedSearch";
import SideSection from "@/components/Home/Side-Section/SideSection";
import Slider from "@/components/Home/slider/Slider";
import { Suspense } from "react";

export default function ContentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <Slider />
      </Suspense>

      <AdvancedSearch />

      <section className="w-[90%]  max-w-[1200px] mx-auto mt-10 grid grid-cols-1 gap-8 md:grid-cols-1 lg:grid-cols-3">
        <div className="order-2 lg:order-1">
          <SideSection />
        </div>
        <div className="lg:col-span-2 order-1 lg:order-2">{children}</div>
      </section>
    </div>
  );
}
