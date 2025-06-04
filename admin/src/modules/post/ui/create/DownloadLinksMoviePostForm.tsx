import { useState } from "react";
import { useFetcher } from "react-router";
import CreateMoviePostForm from "./CreateMoviePostForm";
import DownloadLinksMoviePostForm from "./DownloadLinksMovie";

export default function MoviePostCreate() {
  const [data, setData] = useState();
  const fetcher = useFetcher();
  const [tab, setTab] = useState<"info" | "links">("info"); // 🧠 control tab here

  const busy = fetcher.state !== "idle";

  console.log(fetcher.data);

  return (
    <section className="p-4 w-full h-full">
      {!fetcher.data ? (
        <fetcher.Form method="post" className="flex gap-2">
          <input
            name="imdb_id"
            className="flex-1 bg-neutral-800 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 "
            placeholder="لطفا آیدی imdb را وارد کنید"
            type="text"
          />
          <button
            disabled={busy}
            className="py-1 px-6 cursor-pointer rounded-lg transition hover:bg-blue-600 text-sm bg-blue-500 "
          >
            {busy ? "در حال جستجو" : "جستجو"}
          </button>
        </fetcher.Form>
      ) : (
        <>
          {/*  Tabs - Redesigned */}
          <div className="relative inline-flex bg-neutral-800  rounded-xl mb-6 shadow-inner">
            <button
              onClick={() => setTab("info")}
              className={`px-6 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                tab === "info"
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-gray-400 hover:text-white hover:bg-neutral-700"
              }`}
            >
              اطلاعات فیلم
            </button>
            <button
              onClick={() => setTab("links")}
              className={`px-6 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                tab === "links"
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-gray-400 hover:text-white hover:bg-neutral-700"
              }`}
            >
              لینک‌های دانلود
            </button>
          </div>

          {/*  Tab Content */}
          <div>
            <div className={tab === "info" ? "block" : "hidden"}>
              <CreateMoviePostForm movie={fetcher.data} />
            </div>
            <div className={tab === "links" ? "block" : "hidden"}>
              <DownloadLinksMoviePostForm movie={fetcher.data} />
            </div>
          </div>
        </>
      )}
    </section>
  );
}
