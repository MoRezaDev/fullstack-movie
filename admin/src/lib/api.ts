import { movieType, SeriesType } from "../common/types";

export async function findOrAddMovie(imdb_id: string) {
  const response = await fetch(
    `http://localhost:3001/movie/find-add?imdb_id=${imdb_id}`
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message ?? "Failed to fetch data");
  }

  return await response.json();
}

export async function updateMovie(id: string, updateDto: movieType) {
  await new Promise((res) => setTimeout(() => res(""), 3000));
  const response = await fetch(`http://localhost:3001/movie/${id}`, {
    method: "PATCH",
    body: JSON.stringify(updateDto),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  return await response.json();
}

export async function getAllMovies() {
  await new Promise((res) => setTimeout(() => res(""), 3000));

  const response = await fetch(`http://localhost:3001/movie`);
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  return response.json();
}

export async function deleteMovie(imdb_id: string) {
  console.log("checking imdb_id", imdb_id);
  await new Promise((res, rej) => setTimeout(() => res("s"), 3000));
  const response = await fetch(`http://localhost:3001/movie/${imdb_id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const b = await response.json();
    throw new Error(b.message ?? "faild to fetch data");
  }

  return response.json();
}

export async function findOrAddSeries(imdb_id: string) {
  const response = await fetch(
    `http://localhost:3001/series/find-add?imdb_id=${imdb_id}`
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message ?? "something wrong!");
  }

  return data;
}

export async function updatesSeries(imdb_id: string, updateDto: SeriesType) {
  const response = await fetch(`http://localhost:3001/movie/${imdb_id}`, {
    method: "POST",
    body: JSON.stringify(updateDto),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message ?? "something wrong in update!");
  }

  return data;
}
