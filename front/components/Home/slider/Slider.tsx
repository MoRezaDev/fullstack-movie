import { getSliderContent } from "@/lib/api";
import SwiperWrapper from "./SwiperWrapper";
import SwipperWrapperMobile from "./SwipperWrapperMobile";

export default async function Slider() {
  const data = await getSliderContent();

  if (data.error) return <div>مشکلی در دریافت بوجود آمد</div>;
  return (
    <div dir="ltr">
      <SwiperWrapper data={data} />
    </div>
  );
}
