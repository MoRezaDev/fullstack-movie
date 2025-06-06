import { useFetcher } from "react-router";
import { movieType } from "../../../../common/types";
import UpdateInputWrapper from "../../../../components/post/UpdateInputWrapper";

async function w8() {
  return new Promise((res) => setTimeout(() => res, 3000));
}

export default function CreateMovieForm({ movie }: { movie: movieType }) {
  const fetcher = useFetcher();

  async function b() {
    console.log("before calling w8");

    await w8();
    console.log("after calling w8");
  }

  b().then(() => console.log("after calling b"));

  return (
    <fetcher.Form className="max-w-5xl mx-auto bg-neutral-900 p-4 rounded-md flex flex-col gap-4 ">
      <h1 className="text-2xl">اضافه کردن فیلم</h1>

      {/* adding title */}
      <UpdateInputWrapper defaultValue={movie.title} label="عنوان" />

      {/* adding description */}
      <div className="flex flex-col gap-2">
        <label>توضیحات</label>
        <textarea
          defaultValue={movie.description}
          className="w-full bg-neutral-800 min-h-10 p-2 rounded-md"
        />
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <UpdateInputWrapper label="سال تولید" defaultValue={movie.year} />
        <UpdateInputWrapper label="کارگردان" defaultValue={movie.director} />
        <UpdateInputWrapper label="زمان" defaultValue={movie.duration} />
        <UpdateInputWrapper
          disabled={true}
          label="IMDB id"
          defaultValue={movie.imdb_id}
        />
        <UpdateInputWrapper label="نمره" defaultValue={movie.rating} />
      </div>
    </fetcher.Form>
  );
}
