import { useLoaderData } from "react-router";

export default function Movie() {
  const data = useLoaderData();
  console.log(data);
  return <div>Movie</div>;
}
