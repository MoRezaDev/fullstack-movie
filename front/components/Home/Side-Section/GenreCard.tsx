import { subjectsData } from "@/lib/data";
import Link from "next/link";
import { AiOutlineCluster } from "react-icons/ai";

export default function GenreCard() {
  return (
    <div className="p-2 bg-neutral-800 rounded-md">
      <div className="flex items-center gap-1 border-b p-2">
        <AiOutlineCluster size={20} />
        <span>موضوعات</span>
      </div>

      <div className="mt-8 p-2 grid grid-cols-2 gap-2 text-[11px]">
        {subjectsData.map((subject) => (
          <Link key={subject.title} href={"#"}>
            <div className="flex items-center justify-between">
              <span>{subject.title}</span>
              <span className="bg-green-600 rounded-full w-[47px] flex items-center justify-center p-1">
                {subject.views}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
