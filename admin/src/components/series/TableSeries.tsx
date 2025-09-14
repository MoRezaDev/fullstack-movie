import { FaTrash } from "react-icons/fa6";
import { SeriesType } from "../../common/types";
import { FaEdit } from "react-icons/fa";
import Modal from "../Modal";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { deleteSeries } from "../../lib/api";
import { toast } from "sonner";
import { useNavigate } from "react-router";

export default function TableSeries({ series }: { series: SeriesType[] }) {
  const [deleteTarget, setDeleteTarget] = useState<SeriesType | null>(null); // 🔥 updated

  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: deleteSeries,
    onError: (err) => {
      setDeleteTarget(null);
      toast.error(err.message ?? "مشکلی پیش آمده، لطفا دوباره تلاش کنید");
    },
    onSuccess: () => {
      window.location.reload();
    },
  });

  const handleEdit = (series: SeriesType) => {
    navigate("/series/update", { state: series });
  };

  return (
    <div className="w-full overflow-x-auto text-sm ">
      <div className="w-full border rounded-md  border-neutral-700">
        <table className="w-full">
          <thead>
            <tr className=" *:text-start *:p-2 *:border-b *:border-neutral-700">
              <th>پوستر</th>
              <th>عنوان</th>
              <th className="hidden md:table-cell">تاریخ افزودن</th>
              <th>کلیدها</th>
            </tr>
          </thead>
          <tbody>
            {series.map((series_item: SeriesType, idx: any) => (
              <tr
                key={series_item.imdb_id}
                className={`*:p-2 *:border-neutral-700 ${
                  idx === series.length - 1 ? "" : "*:border-b"
                }`}
              >
                <td>
                  <img
                    src={series_item.poster}
                    className="w-16 h-22 object-cover rounded-md"
                  />
                </td>
                <td>{series_item.title}</td>
                <td className="hidden md:table-cell">
                  {new Date(series_item.createdAt as string).toLocaleDateString(
                    "fa-ir"
                  )}
                </td>
                <td>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setDeleteTarget(series_item)}
                      className="p-1 bg-red-600 rounded-md  cursor-pointer transition hover:opacity-70 "
                    >
                      <FaTrash />
                    </button>

                    <button
                      onClick={() => handleEdit(series_item)}
                      className="p-1 bg-green-500 rounded-md cursor-pointer transition hover:opacity-70"
                    >
                      <FaEdit />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {deleteTarget && (
        <Modal isOpen={!!deleteTarget} onClose={() => setDeleteTarget(null)}>
          <div
            onClick={(e) => e.stopPropagation()}
            className=" bg-neutral-800  p-4 w-[600px] rounded-md"
          >
            <h1 className="text-xl mb-10">آیا اطمینان دارید؟</h1>
            <div className="space-x-2 ">
              <button
                disabled={mutation.isPending}
                onClick={() => mutation.mutate(deleteTarget.imdb_id)}
                className="bg-blue-500 px-2 py-1 rounded-md cursor-pointer transition hover:opacity-50"
              >
                {mutation.isPending ? "شکیبا باشید" : "بله"}
              </button>
              <button
                onClick={() => setDeleteTarget(null)}
                className="bg-red-500 px-2 py-1 rounded-md cursor-pointer transition hover:opacity-50"
              >
                خیر
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
