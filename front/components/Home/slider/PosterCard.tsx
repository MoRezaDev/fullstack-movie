"use client";

import { getTranslatedGenres } from "@/lib/functions";
import Link from "next/link";
import { IoMicOutline } from "react-icons/io5";
import { PiSubtitles } from "react-icons/pi";

export default function PosterCard({ data }: { data: any }) {
  const genres = getTranslatedGenres([
    ...new Set(data.content.genre),
  ] as string[]);

  return (
    <div className="size-full flex flex-col gap-1 mt-50 md:mt-8">
      <div className="flex gap-4">
        {data.content.has_dub && (
          <div className="py-2 px-3 w-fit rounded-sm bg-gradient-to-r from-amber-500 via-amber-400 to-transparent flex items-center gap-1">
            <IoMicOutline size={16} />
            <span>دوبله فارسی</span>
          </div>
        )}
        {data.content.has_subtitle && (
          <div className="py-2 px-3 w-fit rounded-sm bg-gradient-to-r from-green-600 to-transparent flex items-center gap-1">
            <PiSubtitles size={16} />
            <span>زیرنویس فارسی</span>
          </div>
        )}
      </div>

      <Link
        className="w-fit transition duration-300 hover:text-amber-400"
        href={`/content/${data.slug}`}
      >
        <div className="text-xl sm:text-3xl mt-4 text-shadow-lg">
          <span>{data.content.title}</span>
        </div>
      </Link>

      <div className="flex items-center gap-2 text-start text-sm">
        {genres.map((dt: any, idx: number) => (
          <span key={idx}>{dt.translated}</span>
        ))}
      </div>

      <div className="hidden sm:block sm:mt-10 text-[13px] text-neutral-200">
        <span>{data.description.slice(0, 200)}...</span>
      </div>

      {data.content.rating && !data.anime && (
        <div className="flex gap-2">
          <img className="w-[60px] h-[30px] rounded-md" src={"/imdbLogo.png"} />
          <span className="text-amber-300 text-2xl">{data.content.rating}</span>
        </div>
      )}
      {data.content.mal_score && (
        <div className="flex gap-2">
          <img
            className="w-[60px] h-[30px] rounded-md object-cover"
            src={"/myAnimeListLogo.png"}
          />
          <span className="text-white text-2xl">{data.content.mal_score}</span>
        </div>
      )}
    </div>
  );
}
