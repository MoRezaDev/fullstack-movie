import SingleContentCard from "@/components/content/SingleContentCard";
import { getPostBySlug } from "@/lib/api";
import { getUserSession } from "@/lib/dal";

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
