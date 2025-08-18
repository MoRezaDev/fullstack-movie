import { useLoaderData, useNavigation } from "react-router";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { AnimeType } from "../../../common/types";
import { getPaginatedData } from "../../../lib/functions";
import TableAnime from "../../../components/anime/TableAnime";
import NavigationLoader from "../../../components/NavigationLoader";
import PaginateButtons from "../../../components/PaginateButtons";

export default function Series() {
  const data = useLoaderData();
  const [currentPageState, setCurrentPageState] = useState(1);
  const [searchValue, setSearchValue] = useState("");

  const navigation = useNavigation();
  const isNavigating = Boolean(navigation.location);

  const { currentContent, currentPage, totalPages } = getPaginatedData<AnimeType>(
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

  const filteredAnimes = currentContent.filter((anime) =>
    anime.title.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())
  ) as AnimeType[];

  if (isNavigating) return <NavigationLoader />;

  return (
    <div className="p-6">
      <div className="w-full mb-2 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="sm:text-2xl font-bold text-white ">🎬 لیست انیمه ها</h1>
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
      <TableAnime animes={filteredAnimes} />
      <PaginateButtons
        totalPage={totalPages}
        currentPage={currentPageState}
        onBack={onBackButtonPressed}
        onForward={onForwardButtonPressed}
      />
    </div>
  );
}
