import { weekendData } from "@/lib/data";

export default function WeekendScheduleLoading() {
  return (
    <section className="my-4 w-[90%] max-w-[1200px] mx-auto p-4 border-2 text-xs  border-neutral-700 rounded-md flex gap-4">
      <div className="border border-neutral-700 rounded-md">
        <div className="p-4 border-b border-neutral-700">
          <span>جدول پخش هفتگی</span>
        </div>

        <div>
          <ul className=" p-4 flex flex-col gap-3">
            {weekendData.map((day) => (
              <li
                key={day.en}
                className="bg-neutral-800 rounded-md p-2 text-center"
              >
                <span>{day.fa}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      

      <div className="flex-1 border border-neutral-800 rounded-md p-4">
        <div className="p-2   rounded-md animate-pulse space-y-2">
          {/* Title / heading */}
          <div className="h-4 bg-neutral-700 rounded w-3/4"></div>

          {/* Subtitle / info */}
          <div className="h-3 bg-neutral-700 rounded w-1/2"></div>

          {/* Optional content line */}
          <div className="h-3 bg-neutral-700 rounded w-full"></div>
        </div>
      </div>
    </section>
  );
}
