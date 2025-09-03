import SingleContent from "@/components/content/SingleContent";
import AdvancedSearch from "@/components/Home/AdvancedSearch";
import LoadingSkeletonMain from "@/components/Home/Main-content/LoadingSkeletonMain";
import SideSection from "@/components/Home/Side-Section/SideSection";
import Slider from "@/components/Home/Slider";
import { getPostBySlug } from "@/lib/api";
import { Suspense } from "react";

export default async function ContentSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const dt = await getPostBySlug(slug);
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
        <div className="lg:col-span-2 order-1 lg:order-2">
          <SingleContent slug={slug} />
        </div>
      </section>
    </div>
  );
}
