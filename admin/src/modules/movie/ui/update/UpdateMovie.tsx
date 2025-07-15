import { Navigate, useFetcher, useLocation } from "react-router";
import { movieType } from "../../../../common/types";

export default function UpdateMovie() {
  const location = useLocation();
  const data = location.state as movieType;

  const fetcher = useFetcher();

  const allGenres = [
    "Action",
    "Drama",
    "Comedy",
    "Horror",
    "Sci-Fi",
    "Romance",
  ];

  console.log("state of location", data);

  if (!data) {
    return <Navigate to={"/movies"} />;
  }
  return (
    <div className="w-full p-4">
      <h1 className="text-2xl mb-4">فرم تغییر اطلاعات فیلم</h1>
      <fetcher.Form className="grid md:grid-cols-3 bg-neutral-900 p-4 gap-4">
        <div className="flex flex-col">
          <label>عنوان</label>
          <input
            className="bg-neutral-800 p-2 rounded-lg"
            type="text"
            defaultValue={data.title ?? ""}
          />
        </div>
        <div className="flex flex-col">
          <label>آیدی Imdb</label>
          <input
            disabled
            className="bg-neutral-800 p-2 rounded-lg"
            type="text"
            defaultValue={data.imdb_id ?? ""}
          />
        </div>
        <div className="flex flex-col">
          <label>نمره</label>
          <input
            className="bg-neutral-800 p-2 rounded-lg"
            type="text"
            defaultValue={data.rating ?? ""}
          />
        </div>
        <div className="flex flex-col col-span-3">
          <label>توضیحات</label>
          <textarea
            className="bg-neutral-800 p-2 rounded-lg h-38"
            defaultValue={data.description ?? ""}
          />
        </div>
        <div className="flex flex-col">
          <label>کارگردان</label>
          <input
            className="bg-neutral-800 p-2 rounded-lg"
            type="text"
            defaultValue={data.director ?? ""}
          />
        </div>
        <div className="flex flex-col">
          <label>مدت زمان</label>
          <input
            className="bg-neutral-800 p-2 rounded-lg"
            type="text"
            defaultValue={data.duration ?? ""}
          />
        </div>
        <div className="flex flex-col">
          <label>زبان</label>
          <input
            className="bg-neutral-800 p-2 rounded-lg"
            type="text"
            defaultValue={data.language ?? ""}
          />
        </div>

        <div className="flex flex-col">
          <label>ستارگان</label>
          <input
            className="bg-neutral-800 p-2 rounded-lg"
            type="text"
            defaultValue={data.stars ?? ""}
          />
        </div>

        <div className="flex flex-col">
          <label>زیرنویس</label>
          <select
            className="bg-neutral-800 text-white p-2 rounded-lg border-2"
            defaultValue={data.has_subtitle ? "دارد" : "ندارد"}
            name="has_sub"
          >
            <option value="true">دارد</option>
            <option value="false">ندارد</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label>دوبله</label>
          <select
            className="bg-neutral-800 text-white p-2 rounded-lg border-2"
            defaultValue={data.has_dub ? "دارد" : "ندارد"}
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

        

        <button type="submit">Sub</button>
      </fetcher.Form>
    </div>
  );
}
