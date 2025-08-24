import { Suspense } from "react";
import UserProfile from "./UserProfile";
import Image from "next/image";

const linkData = [
  {
    name: "دانلود فیلم",
    url: "/movie",
  },
  {
    name: "دانلود سریال",
    url: "/series",
  },
  {
    name: "دانلود انیمه",
    url: "/anime",
  },
  {
    name: "تماس باما",
    url: "/contact-us",
  },
];

export default function Navbar() {
  return (
    <nav className=" fixed h-[60px] inset-0 w-full  bg-neutral-800 text-[13px] font-[400]">
      <div className="flex size-full items-center py-2 px-8 justify-between">
        <div className="flex items-center gap-4">
          <Image
            src={"/logo.jpg"}
            className="rounded-full"
            width={40}
            height={40}
            alt="logo"
          />
          <div className="flex flex-col items-center justify-center gap-1">
            <h1 className="text-[16px]">ممل فیلم</h1>
            <h1>دانلود رایگان فیلم، سریال، انیمه</h1>
          </div>
        </div>
        <ul className="flex list-none items-center gap-10">
          {linkData.map((item) => (
            <li
              className="cursor-pointer transition hover:text-blue-500"
              key={item.name}
            >
              {item.name}
            </li>
          ))}
        </ul>
        <div>
          <Suspense fallback={<div>Loading...</div>}>
            <UserProfile />
          </Suspense>
        </div>
      </div>
    </nav>
  );
}
