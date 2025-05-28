import { useRouteError } from "react-router";

export default function ErrorMoviePage() {
  const error = useRouteError();
  return (
    <div>
      ErrorMoviePage
      {error instanceof Error && <p>{error.message}</p>}
    </div>
  );
}
