import { DiAndroid } from "react-icons/di";
import { FaTelegram } from "react-icons/fa";
import GenreCard from "./GenreCard";

export default function SideSection() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        {/* telegram link banner */}
        <a
          rel="nofollow noopener"
          target="_blank"
          href="tg://resolve?domain=mamalfilm"
        >
          <div className="relative p-4 bg-gradient-to-r from-blue-500 to-blue-400 rounded-md text-[13px] flex items-center justify-between overflow-hidden">
            {/* rainbow overlay */}
            <div className="absolute inset-0  animate-rainbow opacity-30" />

            {/* content */}
            <div className="relative z-10 flex items-center justify-between w-full">
              <div className="flex flex-col justify-between h-14">
                <span>آدرس کانال تلگرام</span>
                <span>mamalFilm</span>
              </div>
              <FaTelegram size={50} />
            </div>
          </div>
        </a>

        {/* android app banner */}
        <a
          rel="nofollow noopener"
          target="_blank"
          href="http://exampleeeeeee.com/mamalFilm.apk"
        >
          <div className="relative p-4 bg-gradient-to-r from- to-green-400 rounded-md text-[13px] flex items-center justify-between overflow-hidden">
            {/* rainbow overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />

            {/* content */}
            <div className="relative z-10 flex items-center justify-between w-full">
              <div className="flex flex-col justify-between h-14">
                <span>دانلود اپلیکیشن اندروید</span>
                <span>mamalFilm.apk</span>
              </div>
              <DiAndroid size={50} />
            </div>
          </div>
        </a>
      </div>

      <GenreCard />
    </div>
  );
}
