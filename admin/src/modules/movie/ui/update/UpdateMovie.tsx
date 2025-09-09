import { Navigate, useFetcher, useLocation, useNavigate } from "react-router";
import { movieType } from "../../../../common/types";
import { useEffect } from "react";
import { toast } from "sonner";
import { BiEdit } from "react-icons/bi";
import { cn } from "../../../../lib/functions";

export default function UpdateMovie() {
  const location = useLocation();
  const data = location.state as movieType;
  const navigate = useNavigate();

  const fetcher = useFetcher();

  const allGenres = [
    "Action",
    "Drama",
    "Comedy",
    "Horror",
    "Sci-Fi",
    "Romance",
  ];

  useEffect(() => {
    if (fetcher.data?.success && fetcher.state === "idle") {
      toast.success("انجام شد، شما در حال رفتن به صفحه فیلم ها هستید");

      const timerId = setTimeout(() => {
        navigate("/movies");
      }, 3000);

      return () => clearTimeout(timerId);
    }
  }, [navigate, fetcher.state, fetcher.data]);

  console.log("fetcher data", fetcher.data);

  if (!data) {
    return <Navigate to={"/movies"} />;
  }
  return (
    <div className="w-full p-4 text-xs [&_label]:text-green-500 [&_select]:border-neutral-700 [&_select]:focus:outline-none [&_input]:outline-none  ">
      <div className="border-b mb-4 border-neutral-700 pb-2 flex items-center gap-2">
        <BiEdit size={18} className="text-green-500" />
        <h1 className="text-lg ">فرم تغییر اطلاعات فیلم</h1>
      </div>
      <fetcher.Form
        method="post"
        className="grid md:grid-cols-3 bg-neutral-900 p-4 gap-4"
      >
        <div className="flex flex-col">
          <label>عنوان</label>
          <input
            name="title"
            className="bg-neutral-800 p-2 rounded-lg"
            type="text"
            defaultValue={data.title ?? ""}
          />
        </div>
        <div className="flex flex-col">
          <label>آیدی Imdb</label>
          <input
            name="imdb_id"
            className="bg-neutral-800 p-2 rounded-lg"
            type="text"
            defaultValue={data.imdb_id ?? ""}
          />
        </div>
        <div className="flex flex-col">
          <label>نمره</label>
          <input
            name="rating"
            className="bg-neutral-800 p-2 rounded-lg"
            type="text"
            defaultValue={data.rating ?? ""}
          />
        </div>
        <div className="flex flex-col col-span-3">
          <label>توضیحات</label>
          <textarea
            name="description"
            className="bg-neutral-800 p-2 rounded-lg h-38"
            defaultValue={data.description ?? ""}
          />
        </div>
        <div className="flex flex-col">
          <label>کارگردان</label>
          <input
            name="director"
            className="bg-neutral-800 p-2 rounded-lg"
            type="text"
            defaultValue={data.director ?? ""}
          />
        </div>
        <div className="flex flex-col">
          <label>مدت زمان</label>
          <input
            name="duration"
            className="bg-neutral-800 p-2 rounded-lg"
            type="text"
            defaultValue={data.duration ?? ""}
          />
        </div>
        <div className="flex flex-col">
          <label>زبان</label>
          <input
            name="language"
            className="bg-neutral-800 p-2 rounded-lg"
            type="text"
            defaultValue={data.language ?? ""}
          />
        </div>

        <div className="flex flex-col">
          <label>ستارگان</label>
          <input
            name="stars"
            className="bg-neutral-800 p-2 rounded-lg"
            type="text"
            defaultValue={data.stars ?? ""}
          />
        </div>

        <div className="flex flex-col">
          <label>زیرنویس</label>
          <select
            className="bg-neutral-800 text-white p-2 rounded-lg border-2 "
            defaultValue={data.has_subtitle ? "true" : "false"}
            name="has_subtitle"
          >
            <option value="true">دارد</option>
            <option value="false">ندارد</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label>دوبله</label>
          <select
            className="bg-neutral-800 text-white p-2 rounded-lg border-2"
            defaultValue={data.has_dub ? "true" : "false"}
            name="has_dub"
          >
            <option value="true">دارد</option>
            <option value="false">ندارد</option>
          </select>
        </div>

        <div className="flex flex-col col-span-2 ">
          <label className="font-semibold">ژانر</label>
          <div className="flex flex-wrap gap-4  border-2 border-neutral-700 p-2 rounded-md">
            {allGenres.map((genre) => (
              <label
                key={genre}
                className="flex items-center gap-1 !text-white"
              >
                <input
                  type="checkbox"
                  value={genre}
                  defaultChecked={data.genre.includes(genre)}
                  className="accent-sky-600 w-4 h-4"
                  name="genre"
                />
                {genre}
              </label>
            ))}
          </div>
        </div>

        <div></div>

        <div className="col-span-3">
          <label>پوستر</label>
          <img src={data.poster} className="object-cover size-[160px]" />
        </div>

        <button
          disabled={fetcher.state !== "idle" || fetcher.data?.success}
          className={cn("bg-green-600 w-fit p-2 rounded-md transition cursor-pointer hover:opacity-60",
            fetcher.state !== 'idle' && 'cursor-not-allowed opacity-50' 
          )}
          type="submit"
        >
          {fetcher.state !== "idle" ? "لطفا صبر کنید" : "بروزرسانی"}
        </button>
      </fetcher.Form>
    </div>
  );
}
