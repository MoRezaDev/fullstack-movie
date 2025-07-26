import { Navigate, useFetcher, useLocation, useNavigate } from "react-router";
import { AnimeType } from "../../../../common/types";
import { useEffect } from "react";
import { toast } from "sonner";

export default function UpdateSeries() {
  const location = useLocation();
  const data = location.state as AnimeType;
  const navigate = useNavigate();

  const fetcher = useFetcher();

  const allGenres = data.genre.concat(data.demographics);

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
          <label>کشور سازنده</label>
          <input
            name="country"
            className="bg-neutral-800 p-2 rounded-lg"
            type="text"
            defaultValue={data.country ?? ""}
          />
        </div>

        <div className="flex flex-col">
          <label>فصل ها</label>
          <input
            name="total_seasons"
            className="bg-neutral-800 p-2 rounded-lg"
            type="text"
            defaultValue={data.total_seasons ?? ""}
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
          <label>اولین پخش</label>
          <input
            name="released"
            className="bg-neutral-800 p-2 rounded-lg"
            type="text"
            defaultValue={data.released ?? ""}
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
          <label>وضعیت پخش</label>
          <input
            name="status"
            className="bg-neutral-800 p-2 rounded-lg"
            type="duration"
            defaultValue={data.status ?? ""}
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
