"use client";

import { useState } from "react";
import { BiSearch } from "react-icons/bi";
import Modal from "../Modal";
import { useContentSearch } from "@/hooks/useContentSearch";
import Link from "next/link";

export default function SearchBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [isMountedStyle, setIsMountedStyle] = useState(true);

  const { data, isLoading, isError, error } = useContentSearch(searchValue);

  function onCloseSearchButton() {
    setSearchValue("");
    setIsOpen(false);
  }

  return (
    <div className="flex items-center z-20">
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
            style={{ height: data ? "400px" : "150px" }}
            className="w-full  transition-all duration-800 modal-content  max-w-[600px] bg-neutral-800  overflow-y-auto rounded-md text-sm text-white"
          >
            <div className="flex items-center justify-between w-full p-4 mb-4 border-b border-white/10">
              <h3>جستجو فیلم، سریال، انیمه</h3>
            </div>
            <div className="w-full relative p-4">
              <input
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                type="text"
                className="bg-neutral-900 outline-none w-full p-2 rounded-md placeholder:text-white/40"
                placeholder="کلمه مورد نظر را وارد کنید"
              />
              {!isLoading ? (
                <BiSearch className="size-5 absolute left-6 top-6 opacity-50" />
              ) : (
                <span className="inline-block absolute left-6 top-6 size-5 border-2 border-t-transparent border-white/50 rounded-full animate-spin"></span>
              )}
            </div>

            {data && data.length > 0 && (
              <div className="mt-3 flex gap-3 flex-col p-4">
                {data.map((item: any, idx: number) => (
                  <div
                    key={idx}
                    className="p-2 bg-neutral-700 rounded-lg flex gap-2 items-center"
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
