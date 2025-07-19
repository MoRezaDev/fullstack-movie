import { useLoaderData } from "react-router";
import TableMovie from "../../../components/movie/TableMovie";

export default function Movie() {
  const data = useLoaderData();
  console.log(data);
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-white mb-4">🎬 لیست فیلم‌ها</h1>
      <TableMovie movies={data} />
    </div>
  );
}
