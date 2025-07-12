import { useEffect } from "react";
import { useFetcher, useNavigate } from "react-router";
import { toast } from "sonner";

export default function CreateMovie() {
  const fetcher = useFetcher();
  const navigate = useNavigate();
  console.log(fetcher.data);

  useEffect(() => {
    if (fetcher.data && !fetcher.data.error) {
      navigate("/movies/update", {
        state: fetcher.data,
      });
    }
    if (fetcher.data?.error) {
      console.log("ajab");
      toast.error("لطفا دباره تلاش کنید!");
    }
  }, [fetcher.data, navigate]);

  return (
    <fetcher.Form method="post">
      <section className="w-full h-full p-2">
        <div className="max-w-[980px] mx-auto  rounded-md my-2 flex gap-2">
          <input
            name="imdb_id"
            type="text"
            placeholder="لطفا آیدی imdb را وارد کنید"
            className="w-full h-full outline-none p-2 bg-neutral-800 rounded-md"
          />
          <button
            type="submit"
            className="px-2 py-1 hover:cursor-pointer bg-blue-500 rounded-md"
          >
            جستجو
          </button>
        </div>
      </section>
    </fetcher.Form>
  );
}
