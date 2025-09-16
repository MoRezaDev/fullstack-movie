"use client";

import { weekendData } from "@/lib/data";
import { cn } from "@/lib/functions";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { use, useState } from "react";

export default function WeekendClient({ data }: { data: Promise<any[]> }) {
  const weekData = use(data);
  const [activeDay, setActiveDay] = useState(() =>
    new Date().toLocaleDateString("en-US", { weekday: "long" }).toLowerCase()
  );
  const [weekDataState, setWeekDataState] = useState(weekData);

  const mutation = useMutation({
    mutationFn: async (link: string) => {
      const response = await fetch(link);
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message ?? "faild to fetch");
      }
      return data;
    },
    onSuccess: (data) => {
      setWeekDataState(data);
    },
  });

  return (
    <div className="my-4 w-[90%] max-w-[1200px] mx-auto p-4 border-2 text-xs  border-neutral-700 rounded-md flex gap-4 ">
      <div className="border border-neutral-700 rounded-md">
        <div className="p-4 border-b border-neutral-700">
          <span>جدول پخش هفتگی</span>
        </div>

        <div>
          <ul className=" p-4 flex flex-col gap-3">
            {weekendData.map((day) => (
              <li
                onClick={() => {
                  setActiveDay(day.en);
                  mutation.mutate(day.link());
                }}
                key={day.en}
                className={cn(
                  "bg-neutral-800 cursor-pointer rounded-md p-2 text-center",
                  activeDay === day.en && "btn-grad"
                )}
              >
                <span>{day.fa}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex-1 border border-neutral-700 rounded-md p-4 relative h-[370px] overflow-y-scroll ">
        {!weekDataState ||
          (weekDataState.length === 0 && (
            <span>موردی جهت نمایش وجود ندارد</span>
          ))}

        {mutation.isPending && (
          <div className="absolute flex items-center justify-center inset-0 size-full bg-black/50 z-10">
            <span
              role="status"
              aria-label="Loading..."
              className="inline-block w-12 h-12 rounded-full border-2 border-t-2 border-gray-300 border-t-blue-600 animate-spin"
            ></span>
          </div>
        )}

        {weekDataState.length > 0 && (
          <div className="grid md:grid-cols-5 gap-6 overflow-y-auto">
            {weekDataState.map((weekDt) => (
              <Link key={weekDt.id} href={`/content/${weekDt.slug}`}>
                <div className="bg-neutral-800  rounded-md h-[230px] overflow-hidden flex flex-col  ">
                  <div className="w-full h-[75%]">
                    <img
                      src={weekDt.anime?.poster || weekDt.series?.poster}
                      alt="weekLogo"
                      className="size-full object-cover"
                    />
                  </div>
                  <div className="w-full h-full p-2 overflow-y-auto text-center">
                    <span className="break-all">{weekDt.title}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
