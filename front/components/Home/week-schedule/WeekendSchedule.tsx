import { getTodayContent } from "@/lib/api";
import { Suspense } from "react";
import WeekendClient from "./WeekendClient";
import WeekendScheduleLoading from "./WeekendScheduleLoading";

export default function WeekendSchedule() {
  const data = getTodayContent();

  return (
    <section className="mt-8">
      <Suspense fallback={<WeekendScheduleLoading />}>
        <WeekendClient data={data} />
      </Suspense>
    </section>
  );
}
