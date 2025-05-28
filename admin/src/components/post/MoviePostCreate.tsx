import { useState } from "react";
import { useFetcher } from "react-router";
import UpdateMoviePost from "./UpdateMoviePost";

export default function MoviePostCreate() {
  const [data, setData] = useState();
  const fetcher = useFetcher();
  let busy = fetcher.state !== "idle";
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
        <UpdateMoviePost movie={fetcher.data} />
      )}
    </section>
  );
}
