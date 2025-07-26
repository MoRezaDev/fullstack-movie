import { redirect } from "react-router";
import { getUserSession } from "./auth";
import { getAllMovies, getAllSeries } from "./api";

export async function rootLayoutLoader() {
  const session = await getUserSession();
  if (!session) {
    return redirect("/login");
  }
  return session;
}

export async function authLoader() {
  const session = await getUserSession();
  if (session) {
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
