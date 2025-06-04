import { useFetcher } from "react-router";
import { movieType } from "../../../../common/types";
import UpdateInputWrapper from "../../../../components/post/UpdateInputWrapper";

export default function CreateMoviePostForm({ movie }: { movie: movieType }) {
  const fetcher = useFetcher();

  return (
    <fetcher.Form className="max-w-5xl mx-auto bg-neutral-900 p-4 rounded-md flex flex-col gap-4 ">
      <h1 className="text-2xl">اضافه کردن فیلم</h1>

      {/* adding title */}
      <UpdateInputWrapper defaultValue={movie.title} label="عنوان" />
      <UpdateInputWrapper label="توضیحات بنر" />

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
        <UpdateInputWrapper label="وضعیت پخش" />

        
      </div>
    </fetcher.Form>
  );
}
