import { FaDeleteLeft, FaTrash } from "react-icons/fa6";
import { movieType } from "../../common/types";
import { FaEdit } from "react-icons/fa";
import Modal from "../Modal";
import { useState } from "react";

export default function TableMovie({ movies }: { movies: movieType[] }) {
  const [showEditModal, setshowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  console.log("delete modal", showDeleteModal);
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
            {movies.map((movie: movieType, idx: any) => (
              <tr
                className={`*:p-2 *:border-neutral-700 ${
                  idx === movies.length - 1 ? "" : "*:border-b"
                }`}
              >
                <td>
                  <img
                    src={movie.poster}
                    className="w-16 h-22 object-cover rounded-md"
                  />
                </td>
                <td>{movie.title}</td>
                <td className="hidden md:table-cell">
                  {new Date(movie.createdAt).toLocaleDateString("fa-ir")}
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
                          <div className="space-x-2">
                            <button className="bg-blue-500 px-2 py-1 rounded-md cursor-pointer transition hover:opacity-50">
                              بله
                            </button>
                            <button className="bg-red-500 px-2 py-1 rounded-md cursor-pointer transition hover:opacity-50">
                              خیر
                            </button>
                          </div>
                        </div>
                      </Modal>
                    )}
                    <button
                      onClick={() => setshowEditModal(true)}
                      className="p-1 bg-blue-500 rounded-md cursor-pointer transition hover:opacity-70"
                    >
                      <FaEdit />
                    </button>
                    {showEditModal && (
                      <Modal
                        isOpen={showEditModal}
                        onClose={() => setshowEditModal(false)}
                      >
                        <div
                          onClick={(e) => e.stopPropagation()}
                          className="size-[200px] bg-white"
                        ></div>
                      </Modal>
                    )}
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
