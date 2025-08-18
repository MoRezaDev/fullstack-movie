import { useLoaderData, useNavigation } from "react-router";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { getPaginatedData } from "../../lib/functions";
import { PostType } from "../../common/types";
import PaginateButtons from "../../components/PaginateButtons";
import NavigationLoader from "../../components/NavigationLoader";
import TablePosts from "../../components/post/TablePosts";

export default function Post() {
  const data = useLoaderData();
  const [currentPageState, setCurrentPageState] = useState(1);
  const [searchValue, setSearchValue] = useState("");

  const navigation = useNavigation();
  const isNavigating = Boolean(navigation.location);

  const { currentContent, currentPage, totalPages } = getPaginatedData<PostType>(
    data,
    5,
    currentPageState
  );

  function onBackButtonPressed() {
    setCurrentPageState((prev) => prev - 1);
  }

  function onForwardButtonPressed() {
    setCurrentPageState((prev) => prev + 1);
  }

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchValue(e.target.value);
  }

  const filteredPosts = currentContent.filter((posts) =>
    posts.title.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())
  ) as PostType[];

  if (isNavigating) return <NavigationLoader />;

  return (
    <div className="p-6">
      <div className="w-full mb-2 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="sm:text-2xl font-bold text-white "> لیست پست ها</h1>
        <div className=" border border-neutral-800 rounded-full flex items-center px-3">
          <input
            value={searchValue}
            onChange={handleSearch}
            className="p-1 outline-none text-sm w-full"
            placeholder="جستجو"
            type="text"
          />
          <FaSearch className="text-sm text-neutral-500" />
        </div>
      </div>
      <TablePosts posts={filteredPosts} />
      <PaginateButtons
        totalPage={totalPages}
        currentPage={currentPageState}
        onBack={onBackButtonPressed}
        onForward={onForwardButtonPressed}
      />
    </div>
  );
}
