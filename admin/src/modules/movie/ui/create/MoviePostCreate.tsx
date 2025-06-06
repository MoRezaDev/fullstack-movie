import { useFetcher } from "react-router";
import CreateMoviePostForm from "./CreateMovieForm";

export default function MoviePostCreate() {
  const fetcher = useFetcher();

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
        <CreateMoviePostForm movie={fetcher.data} />
      )}
    </section>
  );
}
