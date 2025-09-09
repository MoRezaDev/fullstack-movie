import { Link } from "react-router";

export default function PostContent({
  data,
  contentLink,
}: {
  data: any;
  contentLink: string;
}) {
  console.log("data", data);
  return (
    <div className="w-full  mx-auto bg-neutral-800 grid  md:grid-cols-3 p-4 gap-2 my-2">
      <div className="flex flex-col">
        <label>عنوان</label>
        <input
          className="bg-neutral-700 p-1 rounded-lg"
          disabled
          defaultValue={data.title || ""}
        />
      </div>

      <div className="flex flex-col">
        <label>نمره</label>
        <input
          className="bg-neutral-700 p-1 rounded-lg"
          disabled
          defaultValue={data.imdb_id || data.mal_id || ""}
        />
      </div>

      <div className="flex flex-col">
        <label>سال تولید</label>
        <input
          className="bg-neutral-700 p-1 rounded-lg"
          disabled
          defaultValue={data.year || ""}
        />
      </div>
      <div className="flex flex-col">
        <label>مدت زمان</label>
        <input
          className="bg-neutral-700 p-1 rounded-lg"
          disabled
          defaultValue={data.duration || ""}
        />
      </div>
      <div className="flex flex-col">
        <label>ژانر</label>
        <input
          className="bg-neutral-700 p-1 rounded-lg"
          disabled
          defaultValue={data.genre.join(", ") || ""}
        />
      </div>
      <div className="flex flex-col">
        <label>زبان</label>
        <input
          className="bg-neutral-700 p-1 rounded-lg"
          disabled
          defaultValue={data.language ? data.language : "ژاپنی"}
        />
      </div>

      <div className="flex flex-col col-span-3">
        <label>توضیحات</label>
        <textarea
          className="bg-neutral-700 p-1 rounded-lg"
          disabled
          defaultValue={data.description || ""}
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
            className="bg-green-600 self-end transition hover:opacity-50 cursor-pointer p-2 rounded-md"
          >
            ویرایش
          </Link>
        </div>
      </div>
    </div>
  );
}
