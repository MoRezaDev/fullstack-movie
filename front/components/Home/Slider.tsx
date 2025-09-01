import { getSliderContent } from "@/lib/api";
import SwiperWrapper from "./SwiperWrapper";

export default async function Slider() {
  const data = await getSliderContent();

  if (data.error) return <div>مشکلی در دریافت بوجود آمد</div>;
  return (
    <div dir="ltr" className="w-full h-[300px]">
      <SwiperWrapper data={data} />
    </div>
  );
}
