"use client";

import { BsDownload } from "react-icons/bs";

export default function MovieDownloadBox({
  downloadLinks,
}: {
  downloadLinks: any;
}) {
  console.log("t", downloadLinks);

  return (
    <div className="flex flex-col gap-4 mt-6">
      {downloadLinks.map((item: any, index: number) => (
        <div
          key={item.id}
          className="rounded-md overflow-hidden bg-neutral-700"
        >
          {/* Header */}
          <div className="p-4  bg-neutral-950 flex items-center justify-between">
            <div className="flex items-center gap-2 bg-neutral-700 p-2 rounded-md ">
              <div>
                <span>کیفیت </span>
                <span>{item.link_url.title}</span>
              </div>
            </div>
            <a rel="noopener nofollow" target="_blank" href={`http://${item.link_url.link}`}>
              <div className="flex items-center gap-2 py-2 px-3 rounded-md bg-green-600">
                <BsDownload size={14} />
                <span>دانلود</span>
              </div>
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}
