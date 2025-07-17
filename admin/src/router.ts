import { createBrowserRouter } from "react-router";
import RootLayout from "./modules/layout/ui/RootLayout";
import { authLoader, MoviesLoader, rootLayoutLoader } from "./lib/loaders";
import Login from "./modules/auth/ui/Login";
import Signup from "./modules/auth/ui/Signup";
import AuthLayout from "./modules/auth/ui/AuthLayout";
import NavigateToDashboard from "./modules/layout/ui/NavigateToDashboard";
import Dashboard from "./modules/dashboard/ui/Dashboard";
import NotFound from "./modules/layout/ui/NotFound";
import CreateMovie from "./modules/movie/ui/create/CreateMovie";
import UpdateMovie from "./modules/movie/ui/update/UpdateMovie";
import { findOrAddMovieAction, updateMovieAction } from "./lib/actions";
import Movie from "./modules/movie/ui/Movie";
import LoadingMovie from "./modules/movie/ui/LoadingMovie";
import ErrorPage from "./components/ErrorPage";

export const router = createBrowserRouter([
  {
    Component: RootLayout,
    loader: rootLayoutLoader,
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
            hydrateFallbackElement: LoadingMovie(),
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
