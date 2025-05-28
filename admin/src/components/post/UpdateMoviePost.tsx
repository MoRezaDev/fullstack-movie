// MoviePostForm.tsx
import { useFetcher } from "react-router";

export default function UpdateMoviePost({ movie } : {movie: any}) {
  const fetcher = useFetcher();

  return (
    <fetcher.Form
      method="post"
      className="max-w-3xl mx-auto bg-zinc-900 text-white p-6 rounded-2xl shadow-lg space-y-4"
    >
      {/* Title */}
      <div>
        <label className="block mb-1 text-sm font-semibold text-zinc-300">
          🎬 Title
        </label>
        <input
          name="title"
          defaultValue={movie.title}
          className="w-full bg-zinc-800 border border-zinc-700 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Description */}
      <div>
        <label className="block mb-1 text-sm font-semibold text-zinc-300">
          📝 Description
        </label>
        <textarea
          name="description"
          rows={4}
          defaultValue={movie.description}
          className="w-full bg-zinc-800 border border-zinc-700 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Year */}
      <div>
        <label className="block mb-1 text-sm font-semibold text-zinc-300">
          📅 Year
        </label>
        <input
          name="year"
          type="number"
          defaultValue={movie.year}
          className="w-full bg-zinc-800 border border-zinc-700 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Duration */}
      <div>
        <label className="block mb-1 text-sm font-semibold text-zinc-300">
          ⏱️ Duration
        </label>
        <input
          name="duration"
          defaultValue={movie.duration}
          className="w-full bg-zinc-800 border border-zinc-700 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Rating */}
      <div>
        <label className="block mb-1 text-sm font-semibold text-zinc-300">
          ⭐ Rating
        </label>
        <input
          name="rating"
          type="text"
          defaultValue={movie.rating}
          className="w-full bg-zinc-800 border border-zinc-700 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Stars */}
      <div>
        <label className="block mb-1 text-sm font-semibold text-zinc-300">
          🌟 Stars
        </label>
        <input
          name="stars"
          defaultValue={movie.stars.join(", ")}
          className="w-full bg-zinc-800 border border-zinc-700 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Director */}
      <div>
        <label className="block mb-1 text-sm font-semibold text-zinc-300">
          🎬 Director
        </label>
        <input
          name="director"
          defaultValue={movie.director}
          className="w-full bg-zinc-800 border border-zinc-700 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Genres */}
      <div>
        <label className="block mb-1 text-sm font-semibold text-zinc-300">
          🎭 Genre(s)
        </label>
        <input
          name="genre"
          defaultValue={movie.genre.join(", ")}
          className="w-full bg-zinc-800 border border-zinc-700 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Subtitle + Dub Checkboxes */}
      <div className="flex space-x-4">
        <label className="inline-flex items-center space-x-2">
          <input
            type="checkbox"
            name="has_subtitle"
            defaultChecked={movie.has_subtitle}
            className="form-checkbox text-blue-500 bg-zinc-800 border-zinc-700 rounded focus:ring-blue-500"
          />
          <span className="text-zinc-300">Subtitle</span>
        </label>
        <label className="inline-flex items-center space-x-2">
          <input
            type="checkbox"
            name="has_dub"
            defaultChecked={movie.has_dub}
            className="form-checkbox text-blue-500 bg-zinc-800 border-zinc-700 rounded focus:ring-blue-500"
          />
          <span className="text-zinc-300">Dub</span>
        </label>
      </div>

      {/* Poster URL (read-only) */}
      <div>
        <label className="block mb-1 text-sm font-semibold text-zinc-300">
          🖼️ Poster URL
        </label>
        <input
          name="poster"
          defaultValue={movie.poster}
          readOnly
          className="w-full bg-zinc-800 border border-zinc-700 rounded-md px-4 py-2 text-gray-400 cursor-not-allowed"
        />
      </div>

      {/* Hidden imdb_id */}
      <input type="hidden" name="imdb_id" value={movie.imdb_id} />

      {/* Submit */}
      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300"
      >
        🚀 Submit Movie Post
      </button>
    </fetcher.Form>
  );
}
