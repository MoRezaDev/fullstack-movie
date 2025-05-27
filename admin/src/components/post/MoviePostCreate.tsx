import { useState } from "react";

export default function MoviePostCreate() {
  const [data, setData] = useState();
  return (
    <section className="p-4 w-full h-full">
      {!data ? (
        <div className="flex gap-2">
          <input
            className="flex-1 bg-neutral-800 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 "
            placeholder="لطفا آیدی imdb را وارد کنید"
            type="text"
          />
          <button className="py-1 px-6 cursor-pointer rounded-lg transition hover:bg-blue-600 text-sm bg-blue-500 ">
            جستجو
          </button>
        </div>
      ) : (
        <div></div>
      )}
    </section>
  );
}
