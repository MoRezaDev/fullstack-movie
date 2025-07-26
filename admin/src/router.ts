import { createBrowserRouter } from "react-router";
import RootLayout from "./modules/layout/ui/RootLayout";
import {
  authLoader,
  MoviesLoader,
  rootLayoutLoader,
  seriesLoader,
} from "./lib/loaders";
import Login from "./modules/auth/ui/Login";
import Signup from "./modules/auth/ui/Signup";
import AuthLayout from "./modules/auth/ui/AuthLayout";
import NavigateToDashboard from "./modules/layout/ui/NavigateToDashboard";
import Dashboard from "./modules/dashboard/ui/Dashboard";
import NotFound from "./modules/layout/ui/NotFound";
import CreateMovie from "./modules/movie/ui/create/CreateMovie";
import UpdateMovie from "./modules/movie/ui/update/UpdateMovie";
import {
  findOrAddAnimeAction,
  findOrAddMovieAction,
  findOrAddSeriesAction,
  updateMovieAction,
  updateSeriesAction,
} from "./lib/actions";
import Movie from "./modules/movie/ui/Movie";
import ErrorPage from "./components/ErrorPage";
import GlobalLoading from "./components/GlobalLoading";
import Series from "./modules/series/Series";
import CreateSeries from "./modules/series/ui/create/CreateSeries";
import UpdateSeries from "./modules/series/ui/update/UpdateSeries";
import CreateAnime from "./modules/anime/ui/create/CreateAnime";
import UpdateAnime from "./modules/anime/ui/update/UpdateAnime";

export const router = createBrowserRouter([
  {
    Component: RootLayout,
    loader: rootLayoutLoader,
    HydrateFallback: GlobalLoading,
    errorElement: ErrorPage(),
    children: [
      { index: true, Component: NavigateToDashboard },
      { path: "dashboard", Component: Dashboard },
      { path: "*", Component: NotFound },
      {
        path: "movies",

        children: [
          { path: "new", Component: CreateMovie, action: findOrAddMovieAction },
          {
            path: "update",
            Component: UpdateMovie,
            action: updateMovieAction,
          },
          {
            index: true,
            Component: Movie,
            loader: MoviesLoader,
          },
        ],
      },
      {
        path: "series",
        children: [
          { index: true, Component: Series, loader: seriesLoader },
          {
            path: "new",
            Component: CreateSeries,
            action: findOrAddSeriesAction,
          },
          {
            path: "update",
            Component: UpdateSeries,
            action: updateSeriesAction,
          },
        ],
      },
      {
        path: "anime",
        children: [
          { index: true },
          {
            path: "new",
            Component: CreateAnime,
            action: findOrAddAnimeAction,
          },
          {
            path: "update",
            Component: UpdateAnime,
          },
        ],
      },
    ],
  },
  {
    Component: AuthLayout,
    loader: authLoader,
    children: [
      { path: "login", Component: Login },
      { path: "signup", Component: Signup },
    ],
  },
]);
