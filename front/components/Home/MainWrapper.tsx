import { Suspense } from "react";
import MainContent from "./Main-content/MainContent";
import SideSection from "./Side-Section/SideSection";
import LoadingSkeletonMain from "./Main-content/LoadingSkeletonMain";

export default function MainWrapper() {
  return (
    <section className="w-[90%]  max-w-[1200px] mx-auto mt-10 grid grid-cols-1 gap-8 md:grid-cols-1 lg:grid-cols-3">
      <div className="order-2 lg:order-1">
        <SideSection />
      </div>
      <div className="lg:col-span-2 order-1 lg:order-2">
        <Suspense fallback={<LoadingSkeletonMain />}>
          <MainContent />
        </Suspense>
      </div>
    </section>
  );
}
