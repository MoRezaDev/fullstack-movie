import { FaTrash } from "react-icons/fa6";
import { AnimeType } from "../../common/types";
import { FaEdit } from "react-icons/fa";
import Modal from "../Modal";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { deleteSeries } from "../../lib/api";
import { toast } from "sonner";
import { useNavigate } from "react-router";

export default function TableAnime({ animes }: { animes: AnimeType[] }) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: deleteSeries,
    onError: (err) => {
      setShowDeleteModal(false);
      toast.error(err.message ?? "مشکلی پیش آمده، لطفا دوباره تلاش کنید");
    },
    onSuccess: () => {
      window.location.reload();
    },
  });

  const handleEdit = (anime: AnimeType) => {
    navigate("/anime/update", { state: anime });
  };

  return (
    <div className="w-full overflow-x-auto ">
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
            {animes.map((anime_item: AnimeType, idx: any) => (
              <tr
                key={anime_item.mal_id}
                className={`*:p-2 *:border-neutral-700 ${
                  idx === animes.length - 1 ? "" : "*:border-b"
                }`}
              >
                <td>
                  <img
                    src={anime_item.poster}
                    className="w-16 h-22 object-cover rounded-md"
                  />
                </td>
                <td>{anime_item.title}</td>
                <td className="hidden md:table-cell">
                  {new Date(anime_item.createdAt as string).toLocaleDateString(
                    "fa-ir"
                  )}
                </td>
                <td>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setShowDeleteModal(true)}
                      className="p-1 bg-red-600 rounded-md  cursor-pointer transition hover:opacity-70 "
                    >
                      <FaTrash />
                    </button>
                    {showDeleteModal && (
                      <Modal
                        isOpen={showDeleteModal}
                        onClose={() => setShowDeleteModal(false)}
                      >
                        <div
                          onClick={(e) => e.stopPropagation()}
                          className=" bg-neutral-800  p-4 w-[600px] rounded-md"
                        >
                          <h1 className="text-xl mb-10">آیا اطمینان دارید؟</h1>
                          <div className="space-x-2 ">
                            <button
                              disabled={mutation.isPending}
                              onClick={() => mutation.mutate(anime_item.mal_id)}
                              className="bg-blue-500 px-2 py-1 rounded-md cursor-pointer transition hover:opacity-50"
                            >
                              {mutation.isPending ? "شکیبا باشید" : "بله"}
                            </button>
                            <button
                              onClick={() => setShowDeleteModal(false)}
                              className="bg-red-500 px-2 py-1 rounded-md cursor-pointer transition hover:opacity-50"
                            >
                              خیر
                            </button>
                          </div>
                        </div>
                      </Modal>
                    )}
                    <button
                      onClick={(e) => handleEdit(anime_item)}
                      className="p-1 bg-blue-500 rounded-md cursor-pointer transition hover:opacity-70"
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
    </div>
  );
}
