export async function findOrAddMovie(imdb_id: string) {
  const response = await fetch(
    `http://localhost:3001/movie/find-add?imdb_id=${imdb_id}`
  );
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not fetch movie");
  }

  return data;
}
