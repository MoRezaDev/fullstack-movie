import SingleContentCard from "@/components/content/SingleContentCard";
import { getPostBySlug } from "@/lib/api";
import { getUserSession } from "@/lib/dal";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = await getPostBySlug(slug);

  return {
    title: data.title,
    description: `${data.title} با لینک مستقیم | ممل فیلم دانلوو جدیدترین فیلم ها و سریال ها و انیمه های بدون سانسور`,
  };
}

export default async function ContentSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = await getPostBySlug(slug);
  const user = await getUserSession();
  return (
    <div>
      <SingleContentCard data={data} user={user} />
    </div>
  );
}
