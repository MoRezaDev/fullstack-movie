import { Navigate, useFetcher, useLocation, useNavigate } from "react-router";
import {
  DownloadLinksMovieType,
  DownloadLinksSeriesOrAnimeType,
  PostType,
} from "../../../../common/types";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import MovieDownloadLinkBox from "../../../../components/post/MovieDownloadLinkBox";
import SeriesOrAnimeDownloadLinkBox from "../../../../components/post/SeriesOrAnimeDownloadLinkBox";

export default function UpdatePost() {
  const location = useLocation();
  const data = location.state as PostType;
  const navigate = useNavigate();

  const [downloadLink, setDownloadLink] = useState<
    DownloadLinksMovieType[] | DownloadLinksSeriesOrAnimeType[]
  >(data.download_links);

  const fetcher = useFetcher();

  const contentType = data.movie
    ? "movie"
    : data.series || data.anime
    ? "series"
    : "";

  useEffect(() => {
    if (fetcher.data?.error && fetcher.state === "idle") {
      toast.error(fetcher.data.error ?? "لطفا دوباره تلاش کنید!");
    }
    if (fetcher.data?.success && fetcher.state === "idle") {
      toast.success("انجام شد، شما در حال رفتن به صفحه پست ها هستید");

      const timerId = setTimeout(() => {
        navigate("/posts");
      }, 3000);

      return () => clearTimeout(timerId);
    }
  }, [navigate, fetcher.state, fetcher.data]);

  console.log("fetcher data", fetcher.data);

  if (!data) {
    return <Navigate to={"/posts"} />;
  }
  return (
    <div className="w-full p-4 text-sm ">
      <h1 className="text-2xl mb-4">فرم تغییر اطلاعات پست ها</h1>
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
          <label>اطلاعات اضافی</label>
          <input
            name="extra_info"
            className="bg-neutral-800 p-2 rounded-lg"
            type="text"
            defaultValue={data.extra_info ?? ""}
          />
        </div>
        <div className="flex flex-col">
          <label>اطلاعات باکس دانلود</label>
          <input
            name="download_info"
            className="bg-neutral-800 p-2 rounded-lg"
            type="text"
            defaultValue={data.download_info ?? ""}
          />
        </div>
        <div className="flex flex-col">
          <label>لایک ها</label>
          <input
            disabled
            name="likes"
            className="bg-neutral-800 p-2 rounded-lg text-neutral-600"
            type="text"
            defaultValue={data.like_count ?? ""}
          />
        </div>
        <div className="flex flex-col">
          <label>مشاهده شده ها</label>
          <input
            disabled
            name="views"
            className="bg-neutral-800 p-2 rounded-lg text-neutral-600"
            type="text"
            defaultValue={data.views ?? ""}
          />
        </div>

        <div className="flex flex-col ">
          <label>نمایش برای کاربران VIP</label>
          <select
            className="bg-neutral-800 text-white p-2 rounded-lg border-2"
            defaultValue={data.is_premium ? "true" : "false"}
            name="is_premium"
          >
            <option value="true">بله</option>
            <option value="false">خیر</option>
          </select>
        </div>

        {contentType === "movie" ? (
          <MovieDownloadLinkBox
            isPending={fetcher.state !== "idle"}
            setDataState={
              setDownloadLink as React.Dispatch<
                React.SetStateAction<DownloadLinksMovieType[]>
              >
            }
            dataState={downloadLink as DownloadLinksMovieType[]}
          />
        ) : (
          <SeriesOrAnimeDownloadLinkBox
            isPending={fetcher.state !== "idle"}
            dataState={downloadLink as DownloadLinksSeriesOrAnimeType[]}
            setDataState={
              setDownloadLink as React.Dispatch<
                React.SetStateAction<DownloadLinksSeriesOrAnimeType[]>
              >
            }
          />
        )}
        {/* pass data state to action */}
        <input
          type="hidden"
          name="download_links"
          value={JSON.stringify(downloadLink)}
        />
        <input type="hidden" name="postId" value={data.id} />
        <input type="hidden" name="type" value={contentType} />
        <button
          disabled={fetcher.state !== "idle"}
          type="submit"
          className="bg-blue-500 w-fit px-2 py1 rounded-md transition hover:opacity-50 cursor-pointer p-2"
        >
          {fetcher.state !== "idle" ? "شکیبا باشید" : "ارسال"}
        </button>
      </fetcher.Form>
    </div>
  );
}
