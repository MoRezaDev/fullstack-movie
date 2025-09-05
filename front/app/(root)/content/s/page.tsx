import { getAdvancedSearchQuery } from "@/lib/api";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const data = await getAdvancedSearchQuery(params);
  return <div>Search page</div>;
}
