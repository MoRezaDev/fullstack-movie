import { getUserSessionAndAuth } from "@/lib/dal";

export default async function ProfilePage() {

  const session = await getUserSessionAndAuth();

 
  return (
    <div>s</div>
  );
}
