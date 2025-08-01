import { useState } from "react";
import clsx from "clsx";
import { Link, useNavigate } from "react-router";

export default function CreatePostForm({
  data,
  content,
}: {
  data: any;
  content: string;
}) {
  const [showContent, setShowContent] = useState(false);

  const contentLink = content === "movie" ? "movies" : content;

  return (
    <div className="w-full p-2">
      <div className="bg-neutral-800 rounded-full w-fit p-1 mt-2 flex gap-2 mx-auto">
        <button
          onClick={() => setShowContent(true)}
          className={clsx(
            "px-2 py-1 transition  rounded-full ",
            { "bg-blue-500": showContent === true },
            { "hover:bg-neutral-700": showContent === false }
          )}
        >
          اطلاعات محتوا
        </button>
        <button
          onClick={() => setShowContent(false)}
          className={clsx(
            "px-2 py-1 transition   rounded-full",
            { "bg-blue-500": showContent === false },
            { "hover:bg-neutral-700": showContent === true }
          )}
        >
          پست جدید
        </button>
      </div>

      {/* showing the content */}
      {showContent && (
        <div className="w-full  mx-auto bg-neutral-800 grid md:grid-cols-3 p-4 gap-2 my-2">
          <div className="flex flex-col">
            <label>عنوان</label>
            <input
              className="bg-neutral-700 p-1 rounded-lg"
              disabled
              defaultValue={data.title ?? ""}
            />
          </div>

          <div className="flex flex-col">
            <label>نمره</label>
            <input
              className="bg-neutral-700 p-1 rounded-lg"
              disabled
              defaultValue={data.imdb_id ?? data.mal_id ?? ""}
            />
          </div>

          <div className="flex flex-col">
            <label>سال تولید</label>
            <input
              className="bg-neutral-700 p-1 rounded-lg"
              disabled
              defaultValue={data.year ?? ""}
            />
          </div>
          <div className="flex flex-col">
            <label>مدت زمان</label>
            <input
              className="bg-neutral-700 p-1 rounded-lg"
              disabled
              defaultValue={data.duration ?? ""}
            />
          </div>
          <div className="flex flex-col">
            <label>ژانر</label>
            <input
              className="bg-neutral-700 p-1 rounded-lg"
              disabled
              defaultValue={data.genre.join(", ") ?? ""}
            />
          </div>
          <div className="flex flex-col">
            <label>زبان</label>
            <input
              className="bg-neutral-700 p-1 rounded-lg"
              disabled
              defaultValue={data.language.join(", ") ?? ""}
            />
          </div>

          <div className="flex flex-col col-span-3">
            <label>توضیحات</label>
            <textarea
              className="bg-neutral-700 p-1 rounded-lg"
              disabled
              defaultValue={data.description ?? ""}
            />
          </div>

          <div className="flex flex-col col-span-3">
            <label>پوستر</label>
            <div className="flex justify-between items-start">
              <img
                src={data.poster}
                className="w-[100px] h-150px] object-cover rounded-md"
              />
              <Link
                to={`/${contentLink}/update`}
                state={data}
                className="bg-blue-500 self-end transition hover:opacity-50 cursor-pointer px-2  py-1 rounded-lg"
              >
                ویرایش
              </Link>
            </div>
          </div>
        </div>
      )}
      {!showContent && <div>ss</div>}
    </div>
  );
}
