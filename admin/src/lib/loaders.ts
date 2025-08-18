import { redirect } from "react-router";
import { getUserSession } from "./auth";
import {
  getAllAnimes,
  getAllMovies,
  getAllPosts,
  getAllSeries,
  getAllUsers,
} from "./api";

export async function rootLayoutLoader() {
  const session = await getUserSession();

  if (session && session.error) {
    return redirect("/login");
  }

  return session;
}

export async function authLoader() {
  // const session = await getUserSession();
  const session = await getUserSession();
  if (session && !session.error) {
    return redirect("/");
  }
  return session;
}

export async function MoviesLoader() {
  const movies = await getAllMovies();
  return movies;
}

//series
export async function seriesLoader() {
  const movies = await getAllSeries();
  return movies;
}

//anime
export async function animeLoader() {
  const animes = await getAllAnimes();
  return animes;
}

//post
export async function postLoader() {
  const posts = await getAllPosts();
  return posts;
}

//users
export async function usersLoader() {
  const posts = await getAllUsers();
  return posts;
}
