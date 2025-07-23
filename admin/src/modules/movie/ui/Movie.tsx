import { useLoaderData } from "react-router";
import TableMovie from "../../../components/movie/TableMovie";
import { getPaginatedData } from "../../../lib/functions";
import PaginateButtons from "../../../components/movie/PaginateButtons";
import { ReactElement, ReactEventHandler, useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";

export default function Movie() {
  const data = useLoaderData();
  const [currentPageState, setCurrentPageState] = useState(1);
  const [searchValue, setSearchValue] = useState("");

  const { currentMovies, currentPage, totalPages } = getPaginatedData(
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

  const filteredMovies = currentMovies.filter((movie) =>
    movie.title.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())
  );

  console.log(filteredMovies);

  return (
    <div className="p-6">
      <div className="w-full mb-2 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="sm:text-2xl font-bold text-white ">🎬 لیست فیلم‌ها</h1>
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
      <TableMovie movies={filteredMovies} />
      <PaginateButtons
        totalPage={totalPages}
        currentPage={currentPageState}
        onBack={onBackButtonPressed}
        onForward={onForwardButtonPressed}
      />
    </div>
  );
}
