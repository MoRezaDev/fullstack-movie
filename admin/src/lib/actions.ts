import { findOrAddMovie } from "./api";

export async function findOrAddMovieAction(props: any) {
  const { request } = props;
  const formData = await request.formData();
  const imdb_id = formData.get("imdb_id");
  try {
    const result = await findOrAddMovie(imdb_id);
    return result;
  } catch (err) {
    console.log(err);
  }
}
