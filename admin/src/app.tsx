import { RouterProvider } from "react-router";
import "./app.css";
import { router } from "./router";

export function App() {
  return <RouterProvider  router={router} />;
}
