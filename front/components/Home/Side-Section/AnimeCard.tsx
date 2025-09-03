import { getPostsByType } from "@/lib/api";
import Link from "next/link";
import { SiMyanimelist } from "react-icons/si";

export default async function AnimeCard() {
  const animes = await getPostsByType("anime");
  if (animes.error) throw new Error(animes.error)
  return (
    <div className="p-2 bg-neutral-800 rounded-md">
      <div className="flex items-center gap-2 border-b p-2">
        <SiMyanimelist size={20} />
        <span>انیمه ها</span>
      </div>

      <div className="mt-8 p-2 grid grid-cols-2 gap-4 text-[11px]">
        {animes?.map((item: any) => (
          <Link key={item.id} href={item.slug} className="cursor-pointer">
            <div className="group w-full aspect-[2/3] rounded-xl overflow-hidden shadow-lg transition-transform duration-300 relative text-[10px] flex flex-col ">
              <img
                src={item.anime.poster}
                className="w-full h-full object-cover "
                alt={item.title}
              />
              <div
                dir="rtl"
                className="absolute bg-black/70 bottom-0 p-2 w-full h-[16%] flex items-center justify-center transition-transform duration-400 group-hover:scale-0"
              >
                <span className="text-center">دانلود {item.anime.title}</span>
              </div>
              <div
                dir="rtl"
                className="absolute w-full h-full transition-transform duration-400 scale-0 bg-black/20 inset-0 p-2 flex flex-col gap-2 backdrop-blur-[1px] group-hover:scale-100"
              >
                <h3 className="mt-2 border-b p-2">
                  {item.title} با لینک های ویژه
                </h3>

                <div className="grid grid-cols-3 gap-2 w-full mt-auto">
                  {item.anime.genre.map((genre: any, idx: number) => (
                    <div
                      key={idx}
                      className="px-2 py-1 bg-black/50 rounded-md text-[10px] flex items-center justify-center"
                    >
                      <span className="text-center">{genre}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
