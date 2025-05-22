import { FaSearch } from "react-icons/fa";

export default function SearchBar() {
  return (
    <div className="flex-1 p-2 bg-neutral-800 rounded-lg flex items-center gap-2 mr-10">
      <FaSearch size={16} />
      <input
        type="text"
        placeholder="جستجو"
        className="bg-transparent outline-none text-sm"
      />
    </div>
  );
}
