import { useEffect, useState } from "react";
import ContentTabs from "../../../../components/post/ContentTabs";
import { useFetcher, useNavigation } from "react-router";
import { toast } from "sonner";
import CreatePostForm from "../../../../components/post/CreatePostForm";
import NavigationLoader from "../../../../components/NavigationLoader";

type ContentStateType = "anime" | "movie" | "series";

export default function CreatePost() {
  const navigation = useNavigation();
  const isNavigating = Boolean(navigation.location);

  if (isNavigating) return <NavigationLoader />;

  const [content, setContent] = useState<ContentStateType>("movie");
  const [data, setData] = useState(null);
  const fetcher = useFetcher();

  useEffect(() => {
    if (fetcher.data?.error && fetcher.state === "idle") {
      toast.error(fetcher.data.error ?? "لطفا دوباره تلاش کنید!");
    }

    if (fetcher.data && !fetcher.data.error && fetcher.state === "idle") {
      setData(fetcher.data);
    }
  }, [fetcher.state]);

  console.log(fetcher.data);

  return (
    <div>
      {!data && (
        <div className="w-full flex flex-col items-center mt-4 gap-2">
          <h3 className="text-sm">لطفا نوع محتوا را انتخاب کنید</h3>
          <ContentTabs
            content={content}
            setContent={setContent}
            tabs={["anime", "series", "movie"]}
          />
          <fetcher.Form
            method="post"
            className="w-full flex gap-2 items-center justify-center"
          >
            <input
              type="text"
              name="id"
              className="bg-neutral-800 flex-1 w-full max-w-[900px]  px-2 py-1 outline-0 rounded-lg"
              placeholder={
                content === "anime"
                  ? "لطفا آیدی MyAnimeList را وارد کنید"
                  : content === "movie"
                  ? "لطفا آیدی Imdb را وارد کنید"
                  : "لطفا آیدی Imdb را وارد کنید"
              }
            />
            <input type="hidden" name="content" value={content} />
            <button
              className="bg-blue-600 text-white px-4 py-1 rounded-lg hover:bg-blue-700 cursor-pointer"
              disabled={fetcher.state !== "idle"}
              type="submit"
            >
              {fetcher.state !== "idle" ? "شکیبا باشید" : "ارسال"}
            </button>
            {/* hidden input for passing the value to action function */}
          </fetcher.Form>
        </div>
      )}
      {data && <CreatePostForm data={fetcher.data.data} content={content} />}
    </div>
  );
}
