import { useEffect } from "react";
import { useFetcher, useNavigate } from "react-router";
import { toast } from "sonner";

export default function CreateAnime() {
  const fetcher = useFetcher();
  const navigate = useNavigate();
  console.log(fetcher.data);

  useEffect(() => {
    if (fetcher.data && !fetcher.data.error) {
      navigate("/anime/update", {
        state: fetcher.data,
      });
    }
    if (fetcher.data?.error) {
      toast.error(fetcher.data?.error ?? "لطفا دباره تلاش کنید!");
    }
  }, [fetcher.data, navigate]);

  return (
    <fetcher.Form method="post">
      <section className="w-full h-full p-2 text-xs">
        <div className="max-w-[980px] mx-auto  rounded-md my-2 flex gap-2">
          <input
            name="mal_id"
            type="text"
            placeholder="لطفا آیدی Myanimelist را وارد کنید"
            className="w-full h-full outline-none p-2 bg-neutral-800 rounded-md"
          />
          <button
            dir="ltr"
            type="submit"
            className="bg-green-600 py-1 px-2 rounded-lg hover:cursor-pointer disabled:bg-neutral-800 disabled:text-white text-nowrap"
            disabled={fetcher.state !== "idle"}
          >
            {fetcher.state !== "idle" ? "شکیبا باشید..." : "ارسال"}
          </button>
        </div>
      </section>
    </fetcher.Form>
  );
}
