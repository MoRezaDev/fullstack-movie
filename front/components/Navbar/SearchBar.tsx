"use client";

import { BiSearch } from "react-icons/bi";

export default function SearchBar() {
  return (
    <div className="flex items-center">
      <button className="transition hover:opacity-50 cursor-pointer">
        <BiSearch size={25} />
      </button>
    </div>
  );
}
