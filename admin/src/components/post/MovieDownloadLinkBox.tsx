import { FaPlus } from "react-icons/fa6";
import { FiDelete } from "react-icons/fi";
import {
  DownloadLinkBoxProps,
  DownloadLinksMovieType,
} from "../../common/types";

export default function MovieDownloadLinkBox({
  dataState,
  setDataState,
  submitHandler,
  isPending,
}: DownloadLinkBoxProps<DownloadLinksMovieType>) {
  function handleAddButton() {
    setDataState((prev) => [...prev, { link_url: { title: "", link: "" } }]);
  }
  function deleteItemHandler(index: number) {
    setDataState((prev) => prev.filter((_, i) => i !== index));
  }
  return (
    <div className="mt-8 md:col-span-3">
      <h3>باکس دانلود</h3>
      <button
        type="button"
        onClick={handleAddButton}
        className="bg-blue-500 p-2 rounded-md transition hover:opacity-50 cursor-pointer mb-6 "
      >
        <FaPlus />
      </button>
      <div className="flex flex-col gap-2 w-full ">
        {dataState.map((link, idx) => (
          <div
            key={idx}
            className="flex flex-col sm:flex-row gap-2 items-center p-2 border border-neutral-700 rounded-md w-full"
          >
            <FiDelete
              onClick={() => deleteItemHandler(idx)}
              className="self-start sm:self-end text-red-500 cursor-pointer text-3xl"
            />
            <div className="flex flex-col flex-1 w-full">
              <label>عنوان</label>
              <input
                placeholder="مثال: 720p x264"
                onChange={(e) =>
                  setDataState((prev) =>
                    prev.map((prev, i) =>
                      i === idx
                        ? {
                            link_url: {
                              ...prev.link_url,
                              title: e.target.value,
                            },
                          }
                        : prev
                    )
                  )
                }
                value={link.link_url.title}
                className="bg-neutral-700 outline-none p-1 rounded-md"
                type="text"
              />
            </div>
            <div className="flex flex-col flex-1/2 w-full">
              <label>لینک</label>
              <input
                onChange={(e) =>
                  setDataState((prev) =>
                    prev.map((prev, i) =>
                      i === idx
                        ? {
                            link_url: {
                              ...prev.link_url,
                              link: e.target.value,
                            },
                          }
                        : prev
                    )
                  )
                }
                value={link.link_url.link}
                className="bg-neutral-700 outline-none p-1 rounded-md"
                type="text"
              />
            </div>
          </div>
        ))}
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
    </div>
  );
}
