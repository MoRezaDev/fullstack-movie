import { FaTrash } from "react-icons/fa6";
import { UserType } from "../../common/types";
import { FaEdit } from "react-icons/fa";
import Modal from "../Modal";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { deleteUser } from "../../lib/api";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import { BiSolidDetail } from "react-icons/bi";
import { CgClose } from "react-icons/cg";

export default function TableUsers({ users }: { users: UserType[] }) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: deleteUser,
    onError: (err) => {
      setShowDeleteModal(false);
      toast.error(err.message ?? "مشکلی پیش آمده، لطفا دوباره تلاش کنید");
    },
    onSuccess: () => {
      window.location.reload();
    },
  });

  const handleEdit = (users: UserType) => {
    navigate("/users/update", { state: users });
  };

  console.log(users);
  console.log(showDetailsModal);

  return (
    <div className="w-full overflow-x-auto ">
      <div className="w-full border rounded-md  border-neutral-700">
        <table className="w-full">
          <thead>
            <tr className=" *:text-start *:p-2 *:border-b *:border-neutral-700">
              <th className="hidden md:table-auto">نام</th>
              <th>شماره موبایل</th>
              <th className="hidden md:table-cell">اشتراک</th>
              <th className="hidden md:table-cell">تاریخ افزودن</th>
              <th>کلیدها</th>
              <th className="md:hidden">جزییات</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user_item: UserType, idx: any) => (
              <tr
                key={user_item.id}
                className={`*:p-2 *:border-neutral-700 ${
                  idx === users.length - 1 ? "" : "*:border-b"
                }`}
              >
                <td className="hidden md:table-auto">{user_item.name ?? ""}</td>
                <td>{user_item.mobile ?? ""}</td>
                <td className="hidden md:table-cell">
                  {user_item.is_premium ? (
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                      VIP
                    </span>
                  ) : (
                    <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs font-medium rounded-full">
                      رایگان
                    </span>
                  )}
                </td>
                <td className="hidden md:table-cell">
                  {new Date(user_item.createdAt as string).toLocaleDateString(
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
                              onClick={() => mutation.mutate(user_item.id)}
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
                      onClick={() => handleEdit(user_item)}
                      className="p-1 bg-blue-500 rounded-md cursor-pointer transition hover:opacity-70"
                    >
                      <FaEdit />
                    </button>
                  </div>
                </td>
                <td className="md:hidden">
                  <button
                    onClick={() => {
                      setShowDetailsModal(true);
                    }}
                    className="p-1 bg-blue-500 rounded-md cursor-pointer transition hover:opacity-70"
                  >
                    <BiSolidDetail />
                  </button>
                  {showDetailsModal && (
                    <Modal
                      isOpen={showDetailsModal}
                      onClose={() => setShowDetailsModal(false)}
                    >
                      <div
                        onClick={(e) => e.stopPropagation()}
                        className="w-full h-screen bg-black"
                      >
                        <div className="w-full p-4">
                          <button onClick={() => setShowDetailsModal(false)}>
                            <CgClose className="text-2xl" />
                          </button>
                          <div className="border rounded-md border-neutral-600 mt-4">
                            <table className="w-full text-start table-small ">
                              <tbody>
                                <tr>
                                  <th>نام</th>
                                  <td>{user_item.name ?? "N/A"}</td>
                                </tr>
                                <tr>
                                  <th>انقضا</th>
                                  <td>{user_item.expire_date ?? "N/A"}</td>
                                </tr>
                                <tr>
                                  <th>تاریخ افزودن</th>
                                  <td>
                                    {new Date(
                                      user_item.createdAt as string
                                    ).toLocaleDateString("fa-ir")}
                                  </td>
                                </tr>
                                <tr>
                                  <th>اشتراک</th>
                                  <td>
                                    {user_item.is_premium ? (
                                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                                        VIP
                                      </span>
                                    ) : (
                                      <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs font-medium rounded-full">
                                        رایگان
                                      </span>
                                    )}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </Modal>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
