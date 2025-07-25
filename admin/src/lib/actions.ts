import { SeriesType } from "../common/types";
import {
  findOrAddMovie,
  findOrAddSeries,
  updateMovie,
  updatesSeries,
} from "./api";

export async function findOrAddMovieAction(props: any) {
  const { request } = props;
  const formData = await request.formData();
  const imdb_id = formData.get("imdb_id");

  try {
    const result = await findOrAddMovie(imdb_id);
    return result;
  } catch (err: any) {
    return {
      error: err.message || "Something went wrong",
    };
  }
}

export async function updateMovieAction({ request }: { request: Request }) {
  const formData = await request.formData();
  const title = formData.get("title") as string;
  const imdb_id = formData.get("imdb_id") as string;
  const rating = formData.get("rating") as string;
  const description = formData.get("description") as string;
  const director = formData.get("director") as string;
  const duration = formData.get("duration") as string;
  const language = formData.get("language") as string;
  const stars = formData.get("stars") as string;
  const has_subtitle = formData.get("has_subtitle") as string;
  const has_dub = formData.get("has_dub") as string;
  const year = formData.get("year") as string;
  const genre = formData.getAll("genre") as string[];

  console.log("imdb", imdb_id);

  try {
    const updatedMovie = await updateMovie(imdb_id, {
      title,
      rating,
      description,
      director,
      duration,
      language: language.split(","),
      stars: stars.split(","),
      has_dub: has_dub === "true" ? true : false,
      has_subtitle: has_subtitle === "true" ? true : false,
      genre,
      year: +year,
      imdb_id,
    });
    return { success: true };
  } catch (err) {
    console.log(err.message);
  }

  console.log(has_subtitle, has_dub, genre, imdb_id);
}

//series
export async function findOrAddSeriesAction({ request }: { request: Request }) {
  const formData = await request.formData();
  const imdb_id = formData.get("imdb_id") as string;

  try {
    return await findOrAddSeries(imdb_id);
  } catch (err: any) {
    return {
      error: err.message ?? "ajab",
    };
  }
}

export async function updateSeriesAction({ request }: { request: Request }) {
  const formData = await request.formData();
  const imdb_id = formData.get("imdb_id") as string;
  const title = formData.get("title") as string;
  const rating = formData.get("rating") as string;
  const description = formData.get("description") as string;
  const director = formData.get("director") as string;
  const language = formData.get("language") as string;
  const year = formData.get("year") as string;
  const stars = formData.get("stars") as string;
  const has_subtitle = formData.get("has_subtitle") as string;
  const has_dub = formData.get("has_dub") as string;
  const genre = formData.getAll("genre") as string[];

  const updateDto : SeriesType = {
    imdb_id,
    title,
    rating,
    description,
    director,
    language: language.split(","),
    year : +year,
    stars: stars.split(","),
    has_subtitle: has_subtitle === "true" ? true : false,
    has_dub: has_dub === "true" ? true : false,
    genre,
  };
  try {
    const updatedSeries = await updatesSeries(imdb_id,updateDto);
  } catch (err: any) {
    return { error: err.message ?? "somethings wrong!" };
  }
}
