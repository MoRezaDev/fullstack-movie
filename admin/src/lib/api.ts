import { movieType } from "../common/types";

export async function findOrAddMovie(imdb_id: string) {
  const response = await fetch(
    `http://localhost:3001/movie/find-add?imdb_id=${imdb_id}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch data");
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
