import { CgClose } from "react-icons/cg";
import { FaDeleteLeft, FaLink, FaPlus } from "react-icons/fa6";
import {
  DownloadLinkBoxProps,
  DownloadLinksSeriesOrAnimeType,
} from "../../common/types";

export default function SeriesOrAnimeDownloadLinkBox({
  dataState,
  setDataState,
  submitHandler,
  isPending,
}: DownloadLinkBoxProps<DownloadLinksSeriesOrAnimeType>) {
  function handleAddSeriesOrAnime() {
    setDataState((prev) => [
      ...prev,
      {
        episode: "",
        season: 0,
        link_url: [{ title: "", link: "" }],
        quality: "",
      },
    ]);
  }

  function deleteAnimeOrSeriesHandler(index: number) {
    setDataState((prev) => prev.filter((_, i) => i !== index));
  }

  function handleDeleteLink(parentIndex: number, linkIndex: number) {
    setDataState((prev) =>
      prev.map((item, index) => {
        if (index !== parentIndex) return item;
        else
          return {
            ...item,
            link_url: item.link_url.filter(
              (_, linkIdx) => linkIdx !== linkIndex
            ),
          };
      })
    );
  }

  function addLinksDownloadHandler(index: number) {
    setDataState((prev) =>
      prev.map((itm: any, idx: number) =>
        idx === index
          ? { ...itm, link_url: [...itm.link_url, { title: "", link: "" }] }
          : itm
      )
    );
  }

  function inputChangeHandler(
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    setDataState((prev) =>
      prev.map((item, idx) =>
        idx !== index ? item : { ...item, [e.target.name]: e.target.value }
      )
    );
  }

  return (
    <div className="flex flex-col gap-6 w-full sm:col-span-3">
      <h3>باکس دانلود</h3>
      <button
        type="button"
        onClick={handleAddSeriesOrAnime}
        className="bg-blue-500 p-2 rounded-md transition hover:opacity-50 cursor-pointer mb-6 w-fit"
      >
        <FaPlus />
      </button>
      {dataState.map((link, idx) => (
        <div
          key={idx}
          className="w-full relative border border-neutral-700 p-2 rounded-md"
        >
          <FaDeleteLeft
            onClick={() => deleteAnimeOrSeriesHandler(idx)}
            className="absolute right-0 -top-2 size-5 text-red-500 cursor-pointer transition hover:opacity-80"
          />
          <div className="w-full grid gap-2 sm:grid-cols-3">
            <div className="flex flex-col">
              <label>کیفیت</label>
              <input
                onChange={(e) => inputChangeHandler(idx, e)}
                className="bg-neutral-700 rounded-md p-1"
                type="text"
                name="quality"
                value={link.quality ?? ""}
              />
            </div>
            <div className="flex flex-col">
              <label>فصل</label>
              <input
                onChange={(e) => inputChangeHandler(idx, e)}
                className="bg-neutral-700 rounded-md p-1"
                type="text"
                name="season"
                value={link.season ?? ""}
              />
            </div>
            <div className="flex flex-col">
              <label>تعداد قسمت ها</label>
              <input
                onChange={(e) => inputChangeHandler(idx, e)}
                className="bg-neutral-700 rounded-md p-1"
                type="text"
                name="episode"
                value={link.episode ?? ""}
              />
            </div>
          </div>
          {link.link_url && (
            <div className="border-2 mt-8 border-neutral-700 my-2 p-2 rounded-md">
              {link.link_url.map((linkItem, linkIndex) => (
                <div
                  key={linkIndex}
                  className="flex flex-col sm:flex-row gap-2 sm:items-center"
                >
                  <button
                    type="button"
                    onClick={() => handleDeleteLink(idx, linkIndex)}
                    className="bg-red-500 cursor-pointer transition hover:opacity-80 relative sm:-bottom-2 size-5 flex items-center justify-center rounded-full"
                  >
                    <CgClose className="size-3" />
                  </button>
                  <div className="flex flex-col">
                    <label>عنوان</label>
                    <input
                      onChange={(e) =>
                        setDataState((prev) =>
                          prev.map((prev, i) =>
                            i === idx
                              ? {
                                  ...prev,
                                  link_url: prev.link_url.map(
                                    (prevLink, linkIdx) =>
                                      linkIdx === linkIndex
                                        ? {
                                            ...prevLink,
                                            title: e.target.value,
                                          }
                                        : prevLink
                                  ),
                                }
                              : prev
                          )
                        )
                      }
                      value={linkItem.title}
                      type="text"
                      className="bg-neutral-700 p-2 rounded-md"
                    />
                  </div>
                  <div className="flex flex-col sm:flex-1 ">
                    <label>لینک</label>
                    <input
                      onChange={(e) =>
                        setDataState((prev) =>
                          prev.map((prev, i) =>
                            i === idx
                              ? {
                                  ...prev,
                                  link_url: prev.link_url.map(
                                    (prevLink, linkIdx) =>
                                      linkIdx === linkIndex
                                        ? {
                                            ...prevLink,
                                            link: e.target.value,
                                          }
                                        : prevLink
                                  ),
                                }
                              : prev
                          )
                        )
                      }
                      value={linkItem.link}
                      type="text"
                      className="bg-neutral-700 p-2 rounded-md"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          <button
            onClick={() => addLinksDownloadHandler(idx)}
            type="button"
            className="bg-blue-500 mt-2 p-2 rounded-md transition hover:opacity-50 cursor-pointer  w-fit"
          >
            <FaLink />
          </button>
        </div>
      ))}

      {/*  Submit Button */}
      {submitHandler && (
        <button
          disabled={isPending}
          onClick={submitHandler}
          type="submit"
          className="bg-blue-500 w-fit px-2 py1 rounded-md transition hover:opacity-50 cursor-pointer p-2"
        >
          {isPending ? "شکیبا باشید" : "ارسال"}
        </button>
      )}
    </div>
  );
}
