import { getTranslatedGenres } from "@/lib/functions";
import Link from "next/link";
import { BiDownload, BiHeart, BiSolidMoviePlay } from "react-icons/bi";
import { BsPersonWorkspace } from "react-icons/bs";
import { FaTheaterMasks } from "react-icons/fa";
import { FaImdb } from "react-icons/fa6";
import { GiAlarmClock } from "react-icons/gi";
import { GoNote } from "react-icons/go";
import { GrView } from "react-icons/gr";
import { IoMicOutline } from "react-icons/io5";
import { MdOutlineCalendarToday } from "react-icons/md";
import { PiSubtitles } from "react-icons/pi";
import { SiMyanimelist } from "react-icons/si";
import SeriesDownloadBox from "./SeriesDownloadBox";
import MovieDownloadBox from "./MovieDownloadBox";
import RestrictedDownloadBox from "./RestrictedDownloadBox";

export default async function SingleContentCard({
  data,
  user,
}: {
  data: any;
  user: any;
}) {
  const translatedGenres = getTranslatedGenres(data.content.genre);
  const isUserPremium = user && user.is_premium;
  const isPostPremium = data.is_premium;

  const showFreeSeriesDownloadBox = !isPostPremium && data.content !== "movie";
  const showFreeMoviesDownloadBox = !isPostPremium && data.content === "movie";

  return (
    <div className="p-4 bg-neutral-800 rounded-md">
      <div className="grid md:grid-cols-4 gap-2">
        {/* right section */}
        <div className="flex flex-col gap-4">
          <div className="w-full  h-[320px] sm:h-[360px] md:h-[260px] overflow-hidden rounded-md  ">
            <img
              className="size-full object-cover rounded-md transition duration-300 lg:hover:scale-120"
              src={data.content.poster}
            />
          </div>

          <div className="py-3 px-4 rounded-md bg-neutral-950 text-center w-full flex items-center gap-2 justify-center ">
            <BiSolidMoviePlay size={20} className="text-green-500" />
            <span>مشاهده تریلر</span>
          </div>
        </div>

        {/* left section */}
        <div className="md:col-span-3 flex flex-col gap-4 mr-2">
          <div>
            <h2 className="text-lg"> {data.title}</h2>
          </div>

          <div className="flex items-center gap-2 text-xs flex-wrap">
            <div className="py-2 px-3 rounded-sm bg-gradient-to-r from-blue-500 to-blue-400 ">
              <span>{data.extra_info}</span>
            </div>
            {data.content.has_dub && (
              <div className="py-2 px-3 rounded-sm bg-gradient-to-r from-amber-500 via-amber-400 to-transparent flex items-center gap-1">
                <IoMicOutline size={16} />
                <span>دوبله فارسی</span>
              </div>
            )}
            {data.content.has_subtitle && (
              <div className="py-2 px-3 rounded-sm bg-gradient-to-r from-green-600 to-transparent flex items-center gap-1">
                <PiSubtitles size={16} />
                <span>زیرنویس فارسی</span>
              </div>
            )}
          </div>

          {/* contents */}
          <div className="flex flex-col gap-3">
            {/* time */}
            <div className="flex items-center gap-1 text-xs">
              <GiAlarmClock size={16} className="text-green-500" />
              <span className="font-[400]">زمان :</span>
              <span className="font-[200]">
                {data.content.duration === "N/A"
                  ? "N/A"
                  : data.content.duration.replace(/\D+/g, "") + " دقیقه"}
              </span>
            </div>

            {/* Genre */}
            <div className="flex items-center gap-1 text-xs">
              <FaTheaterMasks size={16} className="text-green-500" />
              <span className="font-[400]">ژانر :</span>
              {translatedGenres.map((ts, idx) => (
                <div key={idx} className="transition hover:text-green-500">
                  <Link href={ts.link}>
                    <span>{ts.translated}</span>
                    {translatedGenres.length - 1 !== idx && <span> ، </span>}
                  </Link>
                </div>
              ))}
            </div>

            {/* Year */}
            <div className="flex items-center gap-1 text-xs">
              <MdOutlineCalendarToday size={16} className="text-green-500" />
              <span className="font-[400]">سال انتشار :</span>
              <span className="font-[200]">{data.content.year}</span>
            </div>

            {/* score */}
            <div className="flex items-center gap-1 text-xs">
              {data.content.type === "TV" ? (
                <SiMyanimelist size={16} className="text-green-500" />
              ) : (
                <FaImdb size={16} className="text-green-500" />
              )}

              <span className="font-[400]"> نمره :</span>
              <span className="font-[200] ">
                {data.content.type === "TV"
                  ? data.content.mal_score
                  : data.content.rating}
              </span>
              {data.content.type === "TV" ? (
                <a target="_blank" href={data.content.mal_url}>
                  <img
                    className="w-[38px] h-[25px] rounded-sm"
                    src={"/myAnimeListLogo.png"}
                  />
                </a>
              ) : (
                <a
                  target="_blank"
                  href={`https://www.imdb.com/title/${data.content.imdb_id}`}
                >
                  <img className="w-[38px] rounded-sm" src="/imdbLogo.png" />
                </a>
              )}
            </div>
            {/* director */}
            <div className="flex items-center gap-1 text-xs">
              <BsPersonWorkspace size={16} className="text-green-500" />
              <span className="font-[400]"> کارگردان :</span>
              <span className="font-[200]">
                {data.content.director ?? "N/A"}
              </span>
            </div>

            {/* description */}
            <div className="text-xs mt-4 text-justify leading-5 ">
              <GoNote
                size={16}
                className="text-green-500 inline-block relative -top-[2px]"
              />
              <span className="font-[400]"> خلاصه داستان : </span>
              <span className="">
                {data.content.description.slice(0, 250)}..
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex w-full mt-8  justify-between text-xs">
        <div className="flex gap-4 items-center bg-neutral-950 py-1 px-2 rounded-md">
          <div className="flex items-center gap-1">
            <BiHeart size={14} className="text-green-500" />
            <span>{data.views}</span>
          </div>
          <div className="flex items-center gap-1">
            <GrView className="text-green-500" size={14} />
            <span>{data.like_count}</span>
          </div>
        </div>
      </div>

      <div className="w-full p-4 rounded-md bg-neutral-900 mt-6 text-xs">
        <div className="border-b pb-2 px-1 border-neutral-600 flex items-center justify-between">
          <span className="text-green-500">باکس دانلود</span>
          <BiDownload size={20} className="text-green-500" />
        </div>
        <div className="mt-2 text-justify p-1  ">
          <span className="text-amber-300">توضیحات : </span>
          {data.download_info && <span>{data.download_info}</span>}
        </div>
        {!isPostPremium && data.content.type !== "movie" && (
          <SeriesDownloadBox downloadLinks={data.download_links} />
        )}
        {!isPostPremium && data.content.type === "movie" && (
          <MovieDownloadBox downloadLinks={data.download_links} />
        )}

        {isPostPremium && !isUserPremium && <RestrictedDownloadBox />}
      </div>
    </div>
  );
}
