import { movieType } from "../../common/types";

export default function TableMovie({ movies }: { movies: movieType[] }) {
  return (
    <div dir="ltr" className="w-full overflow-x-auto">
      <table className="w-full min-w-[850px] border-collapse">
        <thead>
          <tr className="bg-neutral-800 text-white text-left">
            <th className="p-3 text-sm font-semibold">🖼️</th>
            <th className="p-3 text-sm font-semibold">🎬 Title</th>
            <th className="p-3 text-sm font-semibold">📅 Year</th>
            <th className="p-3 text-sm font-semibold">⭐ Rating</th>
            <th className="p-3 text-sm font-semibold">🎭 Genre</th>
            <th className="p-3 text-sm font-semibold">🕓 Created At</th>
            <th className="p-3 text-sm font-semibold text-left">
              ⚙️ Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {movies.map((movie, idx) => (
            <tr
              key={movie.imdb_id}
              className={`transition-colors ${
                idx % 2 === 0 ? "bg-neutral-900" : "bg-neutral-800"
              } hover:bg-neutral-700 text-gray-200`}
            >
              <td className="p-3 align-middle">
                <img
                  src={movie.poster}
                  alt={movie.title}
                  className="w-12 h-[72px] object-cover rounded shadow-sm"
                />
              </td>
              <td className="p-3 align-middle">{movie.title}</td>
              <td className="p-3 align-middle">{movie.year}</td>
              <td className="p-3 align-middle">{movie.rating}</td>
              <td className="p-3 align-middle">{movie.genre.join(", ")}</td>
              <td className="p-3 align-middle">
                {new Date(movie.createdAt).toLocaleDateString("fa-IR")}
              </td>
              <td className="p-3 align-middle">
                <div className="flex gap-2 justify-center items-center">
                  <button
                    onClick={() => console.log("Edit", movie.title)}
                    className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-3 py-1 rounded-md transition"
                  >
                    ✏️ ویرایش
                  </button>
                  <button
                    onClick={() => console.log("Delete", movie.title)}
                    className="bg-red-600 hover:bg-red-700 text-white text-sm px-3 py-1 rounded-md transition"
                  >
                    🗑️ حذف
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
