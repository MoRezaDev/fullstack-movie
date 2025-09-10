import {  getUserSessionAndAuth } from "@/lib/dal";
import { BiSolidMoviePlay } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { FaComment, FaHouseUser } from "react-icons/fa";
import { RiVipFill } from "react-icons/ri";

export default async function layout({
  children,
}: {
  children: React.ReactNode;
}) {
  await getUserSessionAndAuth();

  return (
    <section className="p-4 text-xs w-full max-w-[1280px] mx-auto">
      <div className="flex items-center gap-2">
        <CgProfile size={24} className="text-green-500" />
        <span className="text-lg">پروفایل کاربری</span>
      </div>

      <div className="mt-10 flex gap-4">
        <div className="p-4 bg-black rounded-md ">
          <div className="flex  gap-6 text-sm border-b  pb-4 border-b-neutral-500/30">
            <FaHouseUser size={18} className="text-green-500" />
            <span>اطلاعات کاربری</span>
          </div>
          <div className="flex  gap-6 text-sm border-b  py-4 border-b-neutral-500/30">
            <RiVipFill size={18} className="text-amber-300" />
            <span>تاریخچه اشتراک</span>
          </div>
          <div className="flex  gap-6 text-sm border-b  py-4 border-b-neutral-500/30">
            <BiSolidMoviePlay size={18} className="text-purple-500" />
            <span>لیست تماشا</span>
          </div>
          <div className="flex  gap-6 text-sm border-b  py-4 border-b-neutral-500/30">
            <FaComment size={18} className="text-neutral-400" />
            <span> مدیریت کامنت ها</span>
          </div>
        </div>

        <div className="flex-1 p-4 bg-black rounded-md">{children}</div>
      </div>
    </section>
  );
}
