import { useLoaderData, useNavigation } from "react-router";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { getPaginatedData } from "../../../lib/functions";
import { UserType } from "../../../common/types";
import NavigationLoader from "../../../components/NavigationLoader";
import PaginateButtons from "../../../components/PaginateButtons";
import TableUsers from "../../../components/user/TableUser";

export default function Users() {
  const data = useLoaderData();
  const [currentPageState, setCurrentPageState] = useState(1);
  const [searchValue, setSearchValue] = useState("");

  const navigation = useNavigation();
  const isNavigating = Boolean(navigation.location);

  if (data.statusCode === 401) return <div className="text-2xl p-4">شمااجازه دسترسی به این بخش را ندارید</div>

  const { currentContent, currentPage, totalPages } =
    getPaginatedData<UserType>(data, 5, currentPageState);

  function onBackButtonPressed() {
    setCurrentPageState((prev) => prev - 1);
  }

  function onForwardButtonPressed() {
    setCurrentPageState((prev) => prev + 1);
  }

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchValue(e.target.value);
  }

  const filteredUsers = currentContent.filter((user) =>
    user.mobile.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())
  ) as UserType[];

  if (isNavigating) return <NavigationLoader />;

  return (
    <div className="p-6">
      <div className="w-full mb-2 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="sm:text-2xl font-bold text-white "> لیست پست ها</h1>
        <div className=" border border-neutral-800 rounded-full flex items-center px-3">
          <input
            value={searchValue}
            onChange={handleSearch}
            className="p-1 outline-none text-sm w-full placeholder:text-xs"
            placeholder="جستجو بر اساس شماره موبایل"
            type="text"
          />
          <FaSearch className="text-sm text-neutral-500" />
        </div>
      </div>
      <TableUsers users={filteredUsers} />
      <PaginateButtons
        totalPage={totalPages}
        currentPage={currentPageState}
        onBack={onBackButtonPressed}
        onForward={onForwardButtonPressed}
      />
    </div>
  );
}
