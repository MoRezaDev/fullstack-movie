import { AnimeType, movieType, PostDtoType, SeriesType } from "../common/types";
import {
  imdbValidationSchema,
  myAnimeListValidationSchema,
  PostIdValidationSchema,
} from "./validation.zod";

export async function getMovie(imdb_id: string) {
  //validating
  const validated = imdbValidationSchema.safeParse({ imdb_id });

  if (!validated.success) throw new Error(validated.error.issues[0].message);
  const response = await fetch(
    `http://localhost:3001/movie/${validated.data.imdb_id}`
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message ?? "Failed to fetch data");
  }

  return data;
}

export async function findOrAddMovie(imdb_id: string) {
  //Validating
  const validated = imdbValidationSchema.safeParse({ imdb_id });
  if (!validated.success) throw new Error(validated.error.issues[0].message);

  const response = await fetch(
    `http://localhost:3001/movie/find-add?imdb_id=${imdb_id}`
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message ?? "Failed to fetch data");
  }

  return await response.json();
}

export async function updateMovie(imdb_id: string, updateDto: movieType) {
  //Validating
  const validated = imdbValidationSchema.safeParse({ imdb_id });
  if (!validated.success) throw new Error(validated.error.issues[0].message);

  await new Promise((res) => setTimeout(() => res(""), 3000));
  const response = await fetch(`http://localhost:3001/movie/${imdb_id}`, {
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
  //Validating
  const validated = imdbValidationSchema.safeParse({ imdb_id });
  if (!validated.success) throw new Error(validated.error.issues[0].message);

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

//series
export async function getSeries(imdb_id: string) {
  //Validating
  const validated = imdbValidationSchema.safeParse({ imdb_id });
  if (!validated.success) throw new Error(validated.error.issues[0].message);

  const response = await fetch(`http://localhost:3001/series/${imdb_id}`);

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message ?? "Failed to fetch data");
  }

  return data;
}
export async function findOrAddSeries(imdb_id: string) {
  //Validating
  const validated = imdbValidationSchema.safeParse({ imdb_id });
  if (!validated.success) throw new Error(validated.error.issues[0].message);

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
  //Validating
  const validated = imdbValidationSchema.safeParse({ imdb_id });
  if (!validated.success) throw new Error(validated.error.issues[0].message);

  await new Promise((res, rej) => setTimeout(() => res("hi"), 3000));
  const response = await fetch(`http://localhost:3001/series/${imdb_id}`, {
    method: "PATCH",
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

export async function deleteSeries(imdb_id: string) {
  //Validating
  const validated = imdbValidationSchema.safeParse({ imdb_id });
  if (!validated.success) throw new Error(validated.error.issues[0].message);

  await new Promise((res, rej) => setTimeout(() => res("s"), 3000));
  const response = await fetch(`http://localhost:3001/series/${imdb_id}`, {
    method: "DELETE",
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message ?? "faild to fetch data");
  }

  return data;
}

export async function getAllSeries() {
  await new Promise((res) => setTimeout(() => res(""), 3000));

  const response = await fetch(`http://localhost:3001/series`);

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message ?? "Failed to fetch data");
  }

  return data;
}

//anime

export async function getAnime(mal_id: string) {
  //Validating
  const validated = myAnimeListValidationSchema.safeParse({ mal_id });
  if (!validated.success) throw new Error(validated.error.issues[0].message);

  const response = await fetch(`http://localhost:3001/anime/${mal_id}`);

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message ?? "Failed to fetch data");
  }

  return data;
}
export async function findOrAddAnime(mal_id: string) {
  //Validating
  const validated = myAnimeListValidationSchema.safeParse({ mal_id });
  if (!validated.success) throw new Error(validated.error.issues[0].message);

  const response = await fetch(
    `http://localhost:3001/anime/find-add?mal_id=${mal_id}`
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message ?? "something wrong!");
  }

  return data;
}

export async function updateAnime(
  mal_id: string,
  updateDto: Partial<AnimeType>
) {
  //Validating
  const validated = myAnimeListValidationSchema.safeParse({ mal_id });
  if (!validated.success) throw new Error(validated.error.issues[0].message);

  await new Promise((res, rej) => setTimeout(() => res("hi"), 3000));
  const response = await fetch(`http://localhost:3001/anime/${mal_id}`, {
    method: "PATCH",
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

export async function getAllAnimes() {
  await new Promise((res) => setTimeout(() => res(""), 3000));

  const response = await fetch(`http://localhost:3001/anime`);

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message ?? "Failed to fetch data");
  }

  return data;
}

export async function deleteAnime(mal_id: string) {
  //Validating
  const validated = myAnimeListValidationSchema.safeParse({ mal_id });
  if (!validated.success) throw new Error(validated.error.issues[0].message);

  await new Promise((res, rej) => setTimeout(() => res("s"), 3000));
  const response = await fetch(`http://localhost:3001/anime/${mal_id}`, {
    method: "DELETE",
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message ?? "faild to fetch data");
  }

  console.log("logging delete data", data);

  return data;
}

//post
export async function addPost(postDto: PostDtoType) {
  const response = await fetch(`http://localhost:3001/post`, {
    method: "Post",
    body: JSON.stringify(postDto),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message ?? "faild to fetch data");
  }

  return data;
}

export async function getAllPosts() {
  await new Promise((res) => setTimeout(() => res(""), 3000));

  const response = await fetch(`http://localhost:3001/post`);

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message ?? "Failed to fetch data");
  }

  return data;
}

export async function deletePost(postId: string) {
  //Validating
  const validated = PostIdValidationSchema.safeParse({ postId });
  if (!validated.success) throw new Error(validated.error.issues[0].message);

  await new Promise((res, rej) => setTimeout(() => res("s"), 3000));
  const response = await fetch(`http://localhost:3001/post/${postId}`, {
    method: "DELETE",
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message ?? "faild to fetch data");
  }

  return data;
}
