import { createBrowserRouter } from "react-router";
import RootLayout from "./modules/layout/ui/RootLayout";
import {
  animeLoader,
  authLoader,
  MoviesLoader,
  postLoader,
  rootLayoutLoader,
  seriesLoader,
  usersLoader,
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
  findContentByIdAction,
  findOrAddAnimeAction,
  findOrAddMovieAction,
  findOrAddSeriesAction,
  updateAnimeAction,
  updateMovieAction,
  updatePostAction,
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
import Anime from "./modules/anime/ui/Anime";
import Post from "./modules/post/Post";
import CreatePost from "./modules/post/ui/create/CreatePost";
import UpdatePost from "./modules/post/ui/update/UpdatePost";
import Users from "./modules/users/ui/Users";
import Comments from "./modules/comments/Comments";
import Requests from "./modules/requests/Requests";
import Reports from "./modules/reports/Reports";

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
          { index: true, Component: Anime, loader: animeLoader },
          {
            path: "new",
            Component: CreateAnime,
            action: findOrAddAnimeAction,
          },
          {
            path: "update",
            Component: UpdateAnime,
            action: updateAnimeAction,
          },
        ],
      },
      {
        path: "posts",
        children: [
          { index: true, Component: Post, loader: postLoader },
          { path: "new", Component: CreatePost, action: findContentByIdAction },
          { path: "update", Component: UpdatePost, action: updatePostAction },
        ],
      },
      {
        path: "users",
        children: [{ index: true, Component: Users, loader: usersLoader }],
      },
      {
        path: "comments",
        children: [{ index: true, Component: Comments }],
      },
      {
        path: "requests",
        children: [{ index: true, Component: Requests }],
      },
      {
        path: "reports",
        children: [{ index: true, Component: Reports }],
      },
    ],
  },
  {
    Component: AuthLayout,
    loader: authLoader,
    HydrateFallback: GlobalLoading,
    children: [
      { path: "login", Component: Login },
      { path: "signup", Component: Signup },
    ],
  },
]);
