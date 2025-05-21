import { Navigate } from "react-router";

export default function NavigateToDashboard() {
  return <Navigate to={"/dashboard"} />;
}
