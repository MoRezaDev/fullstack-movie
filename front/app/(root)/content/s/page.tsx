import MainCard from "@/components/Home/Main-content/MainCard";
import { getAdvancedSearchQuery } from "@/lib/api";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const data = await getAdvancedSearchQuery(params);
  if (!data || data.error || data.length === 0)
    return <div className="text-2xl">نتیجه یافت نشد</div>;

  const dataWithContent = data.map((dt: any) => ({
    ...dt,
    content: dt.movie || dt.series || dt.anime,
  }));
  return (
    <section className="flex flex-col gap-4 mt-8">
      {dataWithContent &&
        dataWithContent.map((item: any) => <MainCard data={item} key={item.title} />)}
    </section>
  );
}
