"use client";

import Link from "next/link";
import { BsLink } from "react-icons/bs";
import { IoCloseCircleOutline } from "react-icons/io5";
import { MdMenu } from "react-icons/md";
import { useState } from "react";
import { cn } from "@/lib/functions";
import SearchBarMobileDevice from "./SearchBarMobileDevice";

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
export default function NavBurgerMenu() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="lg:hidden w-full h-full flex items-center justify-between px-2">
      <div className="w-full">
        <button onClick={() => setIsOpen(true)}>
          <MdMenu size={25} />
        </button>

        <div
          className={cn(
            "fixed w-full sm:w-[50%] text-sm text-white transition-transform duration-500 translate-x-full ease-[cubic-bezier(0.68, -0.6, 0.32, 1.6)] top-0 right-0 bg-black p-2 h-full z-11",
            isOpen && "translate-x-0"
          )}
        >
          <div className="flex items-center justify-between border-b py-2">
            <h2 className="text-lg">منوی سایت</h2>
            <button onClick={() => setIsOpen(false)}>
              <IoCloseCircleOutline size={20} className="" />
            </button>
          </div>
          <ul className="flex flex-col list-none gap-4 mt-4">
            {linkData.map((item) => (
              <Link href={item.url} key={item.name}>
                <li className="cursor-pointer transition hover:text-blue-500 flex items-center gap-2">
                  <BsLink size={15} />
                  <span>{item.name}</span>
                </li>
              </Link>
            ))}
          </ul>
        </div>
      </div>
      <SearchBarMobileDevice />
    </div>
  );
}
