import { createBrowserRouter } from "react-router";
import RootLayout from "./modules/layout/ui/RootLayout";
import { authLoader, rootLayoutLoader } from "./lib/loaders";
import Login from "./modules/auth/ui/Login";
import Signup from "./modules/auth/ui/Signup";
import AuthLayout from "./modules/auth/ui/AuthLayout";
import NavigateToDashboard from "./modules/layout/ui/NavigateToDashboard";
import Dashboard from "./modules/dashboard/ui/Dashboard";
import NotFound from "./modules/layout/ui/NotFound";
import CreateMovie from "./modules/movie/ui/create/CreateMovie";
import UpdateMovie from "./modules/movie/ui/update/UpdateMovie";
import { findOrAddMovieAction } from "./lib/actions";
import Movie from "./modules/movie/ui/Movie";

export const router = createBrowserRouter([
  {
    Component: RootLayout,
    loader: rootLayoutLoader,
    children: [
      { index: true, Component: NavigateToDashboard },
      { path: "dashboard", Component: Dashboard },
      { path: "*", Component: NotFound },
      {
        path: "movies",
        children: [
          { path: "new", Component: CreateMovie, action: findOrAddMovieAction },
          { path: "update", Component: UpdateMovie },
          { index: true, Component: Movie },
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
