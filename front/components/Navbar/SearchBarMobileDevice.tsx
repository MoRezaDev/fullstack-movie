"use client";

import { useState } from "react";
import { BiSearch } from "react-icons/bi";
import Modal from "../Modal";
import { useContentSearch } from "@/hooks/useContentSearch";
import Link from "next/link";
import { IoCloseOutline } from "react-icons/io5";

export default function SearchBarMobileDevice() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [isMountedStyle, setIsMountedStyle] = useState(true);

  const { data, isLoading, isError, error } = useContentSearch(searchValue);

  function onCloseSearchButton() {
    setSearchValue("");
    setIsOpen(false);
  }


  return (
    <div className="flex items-center">
      <button
        onClick={() => {
          setIsMountedStyle(true);
          setIsOpen(true);
        }}
        className="transition hover:opacity-50 cursor-pointer"
      >
        <BiSearch size={25} />
      </button>

      {isOpen && (
        <Modal
          isMountedStyle={isMountedStyle}
          setIsMountedStyle={setIsMountedStyle}
          isOpen={isOpen}
          onClose={onCloseSearchButton}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full transition-all duration-800 h-full  max-w-[900px] bg-black p-4  overflow-y-auto rounded-md text-sm text-white "
          >
            <div className="w-full relative border-b flex">
              <button onClick={() => setIsMountedStyle(false)}>
                <IoCloseOutline size={20} />
              </button>
              <input
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                type="text"
                className="outline-none w-full p-2 rounded-md placeholder:text-white/40"
                placeholder="کلمه مورد نظر را وارد کنید"
              />
              {!isLoading ? (
                <BiSearch className="size-5 absolute left-2 top-2 opacity-50" />
              ) : (
                <span className="inline-block absolute left-2 top-2 size-4 border-2 border-t-transparent border-white/50 rounded-full animate-spin"></span>
              )}
            </div>

            {data && data.length > 0 && (
              <div className="mt-3 flex gap-3 flex-col">
                {data.map((item: any, idx: number) => (
                  <div
                    key={idx}
                    className="p-2 bg-neutral-900 rounded-lg flex gap-2 items-center"
                  >
                    <img
                      src={
                        item.movie?.poster ??
                        item.series?.poster ??
                        item.anime?.poster ??
                        ""
                      }
                      className="w-15 h-20 object-cover rounded-md"
                    />
                    <Link
                      onClick={() => setIsMountedStyle(false)}
                      className="transition hover:text-blue-500"
                      href={`/content/${item.slug}`}
                    >
                      <p>{item.title ?? "fff"}</p>
                    </Link>
                  </div>
                ))}
              </div>
            )}
            {data && data.length === 0 && (
              <div className="p-2">موردی یافت نشد!</div>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
}
