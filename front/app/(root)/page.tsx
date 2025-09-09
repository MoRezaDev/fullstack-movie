import AdvancedSearch from "@/components/Home/AdvancedSearch";
import MainWrapper from "@/components/Home/MainWrapper";
import Slider from "@/components/Home/Slider";
import LoadingSpinner from "@/components/LoadingSpinner";
import React, { Suspense } from "react";

export default function Home() {
  return (
    <div className="w-full z-2 pb-4">
      <Suspense fallback={<div className="w-full h-[400px]"><LoadingSpinner /></div>}>
        <Slider />
      </Suspense>

      <AdvancedSearch />

      <MainWrapper />
    </div>
  );
}
