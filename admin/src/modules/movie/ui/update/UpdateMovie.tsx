import { Navigate, useLocation } from "react-router";
import { movieType } from "../../../../common/types";

export default function UpdateMovie() {
  const location = useLocation();
  const data = location.state as movieType;

  console.log("state of location", data);

  if (!data) {
    return <Navigate to={"/movies"} />;
  }
  return <div className="w-full p-4"></div>;
}
