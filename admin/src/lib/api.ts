export async function findOrAddMovie(imdb_id: string) {
  const response = await fetch(
    `http://localhost:3001/movie/find-add?imdb_id=${imdb_id}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  return await response.json();
}
