import AdvancedSearch from "@/components/Home/AdvancedSearch";
import MainWrapper from "@/components/Home/MainWrapper";
import Slider from "@/components/Home/Slider";
import React, { Suspense } from "react";

export default function Home() {
  return (
    <div className="w-full  z-2">
      <Suspense fallback={<div>Loading...</div>}>
        <Slider />
      </Suspense>

      <AdvancedSearch />

      <MainWrapper />
    </div>
  );
}
