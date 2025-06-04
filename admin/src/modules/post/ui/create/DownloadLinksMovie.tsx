import { useFetcher } from "react-router";

export default function DownloadLinksMoviePostForm({ movie }: { movie: any }) {
  const fetcher = useFetcher();
  return (
    <fetcher.Form className="max-w-5xl mx-auto bg-neutral-900 p-4 rounded-md flex flex-col gap-4 "></fetcher.Form>
  );
}
