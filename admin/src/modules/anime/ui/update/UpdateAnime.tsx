import { Navigate, useFetcher, useLocation, useNavigate } from "react-router";
import { AnimeType } from "../../../../common/types";
import { useEffect } from "react";
import { toast } from "sonner";

export default function UpdateSeries() {
  const location = useLocation();
  const data = location.state as AnimeType;
  const navigate = useNavigate();

  const fetcher = useFetcher();

  const allGenres = data.genre
    .concat(data.demographics)
    .concat(["Action", "Fantasy", "Ecchi", "Isekay","Sci-Fi"]);
  const dataGenres = data.genre.concat(data.demographics);

  useEffect(() => {
    if (fetcher.data?.success && fetcher.state === "idle") {
      toast.success("انجام شد، شما در حال رفتن به صفحه انیمه ها هستید");

      const timerId = setTimeout(() => {
        navigate("/anime");
      }, 3000);

      return () => clearTimeout(timerId);
    }
  }, [navigate, fetcher.state, fetcher.data]);

  console.log("fetcher data", fetcher.data);

  if (!data) {
    return <Navigate to={"/anime"} />;
  }
  return (
    <div className="w-full p-4 text-sm ">
      <h1 className="text-2xl mb-4">فرم تغییر اطلاعات انیمه ها</h1>
      <fetcher.Form
        method="PATCH"
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
          <label>آیدی MyAnimeList</label>
          <input
            name="mal_id"
            className="bg-neutral-800 p-2 rounded-lg"
            type="text"
            defaultValue={data.mal_id ?? ""}
          />
        </div>
        <div className="flex flex-col">
          <label>زمان پخش</label>
          <input
            name="broadcast"
            className="bg-neutral-800 p-2 rounded-lg"
            type="text"
            defaultValue={data.broadcast ?? ""}
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
          <label>نمره MyAnimeList</label>
          <input
            name="mal_score"
            className="bg-neutral-800 p-2 rounded-lg"
            type="text"
            defaultValue={data.mal_score ?? ""}
          />
        </div>
        <div className="flex flex-col">
          <label>تعداد آراء</label>
          <input
            name="mal_scored_by"
            className="bg-neutral-800 p-2 rounded-lg"
            type="text"
            defaultValue={data.mal_scored_by ?? ""}
          />
        </div>
        <div className="flex flex-col">
          <label>رتبه</label>
          <input
            name="mal_rank"
            className="bg-neutral-800 p-2 rounded-lg"
            type="text"
            defaultValue={data.mal_rank ?? ""}
          />
        </div>
        <div className="flex flex-col">
          <label>محبوبیت</label>
          <input
            name="mal_popularity"
            className="bg-neutral-800 p-2 rounded-lg"
            type="text"
            defaultValue={data.mal_popularity ?? ""}
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
          <label>شروع فصل از</label>
          <input
            name="aired_from"
            className="bg-neutral-800 p-2 rounded-lg"
            type="text"
            defaultValue={new Date(data.aired_from).toLocaleDateString() ?? ""}
          />
        </div>

        <div className="flex flex-col">
          <label>سال تولید</label>
          <input
            name="year"
            className="bg-neutral-800 p-2 rounded-lg"
            type="text"
            defaultValue={data.year ?? ""}
          />
        </div>

        <div className="flex flex-col">
          <label>فصل</label>
          <input
            name="season"
            className="bg-neutral-800 p-2 rounded-lg"
            type="text"
            defaultValue={data.season ?? ""}
          />
        </div>

        <div className="flex flex-col">
          <label>قسمت ها</label>
          <input
            name="episodes"
            className="bg-neutral-800 p-2 rounded-lg"
            type="text"
            defaultValue={data.episodes ?? ""}
          />
        </div>

        <div className="flex flex-col">
          <label>وضعیت پخش</label>
          <input
            name="status"
            className="bg-neutral-800 p-2 rounded-lg"
            type="duration"
            defaultValue={data.status ?? ""}
          />
        </div>

        <div className="flex flex-col">
          <label>شبکه های پخش</label>
          <input
            name="streaming"
            className="bg-neutral-800 p-2 rounded-lg"
            type="text"
            defaultValue={data.streaming ?? ""}
          />
        </div>

        <div className="flex flex-col">
          <label>زیرنویس</label>
          <select
            className="bg-neutral-800 text-white p-2 rounded-lg border-2"
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
          <div className="flex flex-wrap gap-4  border-2 p-2 rounded-md">
            {allGenres.map((genre) => (
              <label key={genre} className="flex items-center gap-1 text-white">
                <input
                  type="checkbox"
                  value={genre}
                  defaultChecked={dataGenres.includes(genre)}
                  className="accent-sky-600 w-4 h-4"
                  name="genre"
                />
                {genre}
              </label>
            ))}
          </div>
        </div>

         <div className="flex flex-col">
          <label> عنوان به انگلیسی</label>
          <input
            name="title_english"
            className="bg-neutral-800 p-2 rounded-lg"
            type="duration"
            defaultValue={data.title_english ?? ""}
          />
        </div>
         <div className="flex flex-col">
          <label> عنوان به ژاپنی</label>
          <input
            name="title_japanese"
            className="bg-neutral-800 p-2 rounded-lg"
            type="duration"
            defaultValue={data.title_japanese ?? ""}
          />
        </div>

        

        <div className="col-span-3">
          <label>پوستر</label>
          <img src={data.poster} className="object-cover size-[160px]" />
        </div>

        <button
          disabled={fetcher.state !== "idle"}
          className="bg-blue-500 w-fit p-1 rounded-lg transition cursor-pointer hover:bg-blue-400"
          type="submit"
        >
          {fetcher.state !== "idle" ? "لطفا صبر کنید" : "بروزرسانی"}
        </button>
      </fetcher.Form>
    </div>
  );
}
