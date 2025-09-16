"use client";

import { cn } from "@/lib/functions";
import { useState } from "react";
import { AiFillCaretLeft } from "react-icons/ai";
import { BsDownload } from "react-icons/bs";
import { FaDownload } from "react-icons/fa6";

export default function SeriesDownloadBox({
  downloadLinks,
}: {
  downloadLinks: any;
}) {
  const [expandArray, setExpandArray] = useState<boolean[]>(
    downloadLinks.map(() => false)
  );

  function handleExpand(index: number) {
    setExpandArray((prev) =>
      prev.map((prevItem, idx) => (idx === index ? !prevItem : prevItem))
    );
  }


  return (
    <div className="flex flex-col gap-4 mt-6">
      {downloadLinks.map((item: any, index: number) => (
        <div
          key={item.id}
          className="rounded-md overflow-hidden bg-neutral-700"
        >
          {/* Header */}
          <div
            onClick={() => handleExpand(index)}
            className="p-2 cursor-pointer bg-neutral-950 flex items-center justify-between"
          >
            <div className="flex items-cetner gap-2">
              <div className="flex items-center gap-4 bg-neutral-800 p-2 rounded-md ">
                <BsDownload size={16} />
                <span className="text-sm self-end">فصل {item.season}</span>
              </div>
              <div className="flex items-center gap-4 bg-green-600 p-2 rounded-md ">
                <span className="text-sm self-end">{item.episode} قسمت</span>
              </div>
            </div>
            <AiFillCaretLeft
              size={20}
              className={cn(
                "transition-transform duration-300",
                expandArray[index] && "-rotate-90"
              )}
            />
          </div>

          {/* Expandable Content */}
          <div
            className={cn(
              "grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 bg-neutral-800",
              expandArray[index] && "grid-rows-[1fr]"
            )}
          >
            <div className="overflow-hidden ">
              <div className="p-4 flex flex-col gap-6">
                {item.link_url.map((linkObj : any, idx : number) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between border-b border-neutral-600 pb-1"
                  >
                    <span className="text-green-500">{linkObj.title}</span>
                    <a
                      href={`http://${linkObj.link}`}
                      rel="noopener"
                      target="_blank"
                    >
                      <div className="flex items-cetner gap-2 bg-green-600 p-2 rounded-md">
                        <FaDownload size={14} />
                        <span>دانلود</span>
                      </div>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
