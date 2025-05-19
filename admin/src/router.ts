import { createBrowserRouter, redirect } from "react-router";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Layout from "./pages/Layout";
import Home from "./pages/Home";

export const router = createBrowserRouter([
  {
    Component: Layout,
    loader: async () => {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      const session = null;
      if (!session) return redirect("/login");
      return { session: "ok" };
    },
    children: [{ index: true, Component: Home }],
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/signup",
    Component: Signup,
  },
]);
