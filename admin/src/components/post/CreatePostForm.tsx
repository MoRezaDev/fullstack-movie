import { useRef, useState } from "react";
import clsx from "clsx";
import { useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import { addPostAction } from "../../lib/actions";
import { toast } from "sonner";
import { createPostDto } from "../../lib/functions";
import PostContent from "./PostContent";
import SeriesOrAnimeDownloadLinkBox from "./SeriesOrAnimeDownloadLinkBox";
import MovieDownloadLinkBox from "./MovieDownloadLinkBox";
import {
  AnimeDataType,
  DownloadLinksMovieType,
  DownloadLinksSeriesOrAnimeType,
  MovieDataType,
  SeriesDataType,
} from "../../common/types";

export default function CreatePostForm({
  data,
  content,
}: {
  data: MovieDataType | SeriesDataType | AnimeDataType;
  content: string;
}) {
  const [showContent, setShowContent] = useState(false);
  const [downloadsLink, setDownloadsLink] = useState<DownloadLinksMovieType[]>(
    []
  );
  const [seriesOrAnime, setSeriesOrAnime] = useState<
    DownloadLinksSeriesOrAnimeType[]
  >([]);

  const navigate = useNavigate();
  const formRef = useRef(null);

  const mutation = useMutation({
    mutationFn: addPostAction,
    onSuccess: () => {
      toast.success("موفقیت آمیز بود، شما در حال رفتن به منوی پست ها هستید");
      setTimeout(() => {
        navigate("/posts");
      }, 3000);
    },
    onError: (err) => {
      toast.error(err.message ?? "something wrong!");
    },
  });

  const contentLink = content === "movie" ? "movies" : content;

  console.log(seriesOrAnime);

  function submitHandler(e: React.FormEvent) {
    e.preventDefault();
    const formData = new FormData(formRef.current!);
    const download_links = content === "movie" ? downloadsLink : seriesOrAnime;
    const postDto = createPostDto(formData, content, download_links, data.id);

    mutation.mutate(postDto);
  }

  return (
    <form ref={formRef} className="w-full p-2">
      <div className="bg-neutral-800 rounded-full w-fit p-1 mt-2 flex gap-2 mx-auto">
        <button
          type="button"
          onClick={() => setShowContent(true)}
          className={clsx(
            "px-2 py-1 transition  rounded-full ",
            { "bg-blue-500": showContent === true },
            { "hover:bg-neutral-700": showContent === false }
          )}
        >
          اطلاعات محتوا
        </button>
        <button
          type="button"
          onClick={() => setShowContent(false)}
          className={clsx(
            "px-2 py-1 transition   rounded-full",
            { "bg-blue-500": showContent === false },
            { "hover:bg-neutral-700": showContent === true }
          )}
        >
          پست جدید
        </button>
      </div>

      {/* showing the content */}
      {showContent && <PostContent data={data} contentLink={contentLink} />}
      {!showContent && (
        <div className="w-full p-4 grid  md:grid-cols-3 gap-2 bg-neutral-800 my-2">
          <div className="flex flex-col">
            <label>عنوان</label>
            <input
              type="text"
              name="title"
              className="bg-neutral-700 p-1 rounded-md"
            />
          </div>

          <div className="flex flex-col">
            <label>اطلاعات اضافی</label>
            <input
              type="text"
              name="extra_info"
              className="bg-neutral-700 p-1 rounded-md"
            />
          </div>

          <div className="flex flex-col">
            <label>اطلاعات باکس دانلود</label>
            <input
              type="text"
              name="download_info"
              className="bg-neutral-700 p-1 rounded-md"
            />
          </div>

          <div className="flex flex-col md:col-span-3">
            <label>توضیحات</label>
            <textarea
              name="description"
              defaultValue={data.description ?? ""}
              className="bg-neutral-700 p-1 rounded-md"
            />
          </div>

          <div className="md:col-span-3 grid  md:grid-cols-3">
            <div className="flex flex-col">
              <label>نمایش برای کاربران اشتراکی</label>
              <select
                className="bg-neutral-800 text-white p-2 rounded-lg border-2"
                defaultValue={"false"}
                name="is_premium"
              >
                <option value="true">بله</option>
                <option value="false">خیر</option>
              </select>
            </div>
          </div>

          {content === "movie" ? (
            <MovieDownloadLinkBox
              isPending={mutation.isPending}
              dataState={downloadsLink}
              setDataState={setDownloadsLink}
              submitHandler={submitHandler}
            />
          ) : (
            <SeriesOrAnimeDownloadLinkBox
              isPending={mutation.isPending}
              dataState={seriesOrAnime}
              setDataState={setSeriesOrAnime}
              submitHandler={submitHandler}
            />
          )}
        </div>
      )}
    </form>
  );
}
