import { AnimeType, PostDtoType, SeriesType } from "../common/types";
import {
  addPost,
  findOrAddAnime,
  findOrAddMovie,
  findOrAddSeries,
  getAnime,
  getMovie,
  getSeries,
  updateAnime,
  updateMovie,
  updatePost,
  updatesSeries,
} from "./api";

//Movie
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
  } catch (err: any) {
    console.log(err.message);
  }
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
  const duration = formData.get("duration") as string;
  const country = formData.get("country") as string;
  const status = formData.get("status") as string;
  const released = formData.get("released") as string;
  const total_seasons = formData.get("total_seasons") as string;
  const has_subtitle = formData.get("has_subtitle") as string;
  const has_dub = formData.get("has_dub") as string;
  const genre = formData.getAll("genre") as string[];

  const updateDto: SeriesType = {
    imdb_id,
    title,
    rating,
    description,
    director,
    language: language.split(","),
    year: +year,
    stars: stars.split(","),
    has_subtitle: has_subtitle === "true" ? true : false,
    has_dub: has_dub === "true" ? true : false,
    genre,
    country,
    total_seasons: +total_seasons,
    released,
    duration,
    status,
  };
  try {
    await updatesSeries(imdb_id, updateDto);
    return { success: true };
  } catch (err: any) {
    return { error: err.message ?? "somethings wrong!" };
  }
}

//anime
export async function findOrAddAnimeAction({ request }: { request: Request }) {
  const formData = await request.formData();
  const mal_id = formData.get("mal_id") as string;

  try {
    return await findOrAddAnime(mal_id);
  } catch (err: any) {
    return {
      error: err.message ?? "ajab",
    };
  }
}

export async function updateAnimeAction({ request }: { request: Request }) {
  const formData = await request.formData();
  const mal_id = formData.get("mal_id") as string;
  const title = formData.get("title") as string;
  const broadcast = formData.get("broadcast") as string;
  const description = formData.get("description") as string;
  const mal_score = formData.get("mal_score") as string;
  const mal_scored_by = formData.get("mal_scored_by") as string;
  const mal_rank = formData.get("mal_rank") as string;
  const mal_popularity = formData.get("mal_popularity") as string;
  const duration = formData.get("duration") as string;
  const aired_from = formData.get("aired_from") as string;
  const year = formData.get("year") as string;
  const season = formData.get("season") as string;
  const episodes = formData.get("episodes") as string;
  const status = formData.get("status") as string;
  const streaming = formData.get("streaming") as string;
  const has_subtitle = formData.get("has_subtitle") as string;
  const has_dub = formData.get("has_dub") as string;
  const genre = formData.getAll("genre") as string[];
  const title_english = formData.get("title_english") as string;
  const title_japanese = formData.get("title_japanese") as string;

  const updateDto: Partial<AnimeType> = {
    mal_id,
    title,
    broadcast,
    description,
    mal_score,
    mal_scored_by,
    mal_rank,
    mal_popularity,
    duration,
    aired_from,
    year: +year,
    season,
    episodes,
    status,
    streaming: streaming.split(","),
    has_dub: has_dub === "true" ? true : false,
    has_subtitle: has_subtitle === "true" ? true : false,
    title_english,
    title_japanese,
    genre,
  };

  try {
    await updateAnime(mal_id, updateDto);
    return { success: true };
  } catch (err: any) {
    return { error: err.message ?? "somethings wrong!" };
  }
}

//post
export async function findContentByIdAction({ request }: { request: Request }) {
  const formData = await request.formData();
  const id = formData.get("id") as string;
  const content = formData.get("content") as "movie" | "anime" | "series";

  try {
    let result;
    if (content === "anime") result = await getAnime(id);
    else if (content === "movie") result = await getMovie(id);
    else if (content === "series") result = await getSeries(id);
    return {
      success: true,
      data: result,
    };
  } catch (err: any) {
    return {
      error: err.message ?? "somethings wrong!",
    };
  }
}

export async function addPostAction(dataObj: any) {
  const { id, content, ...rest } = dataObj;
  const newData = { ...rest, [content]: { connect: { id } } };

  return await addPost(newData);
}

export async function updatePostAction({ request }: { request: Request }) {
  const formData = await request.formData();
  const formDataObject = Object.fromEntries(formData.entries());
  const raw_download_links = JSON.parse(
    formDataObject.download_links as string
  );
  console.log("raw", raw_download_links);
  const download_links =
    (formDataObject.type as string) === "movie"
      ? raw_download_links
      : raw_download_links.map((raw: any) => ({
          episode: raw.episode,
          season: raw.season,
          link_url: raw.link_url,
          quality: raw.quality,
        }));

  const updateDto = {
    title: formDataObject.title as string,
    download_info: formDataObject.download_info as string,
    extra_info: formDataObject.extra_info as string,
    is_premium: (formDataObject.is_premium as string) === "true" ? true : false,
    download_links: { create: download_links },
  };

  try {
    await updatePost(formDataObject.postId as string, updateDto);
    return { success: true };
  } catch (err: any) {
    return { error: err.message ?? "somethings wrong!" };
  }
}
