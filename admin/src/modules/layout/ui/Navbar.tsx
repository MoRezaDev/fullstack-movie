import { FaMessage } from "react-icons/fa6";
import { MdNotifications } from "react-icons/md";
import SearchBar from "../../../components/SearchBar";

export default function Navbar() {
  return (
    <div className="w-full h-18 bg-neutral-900 flex items-center p-4">
      <div className="flex items-center gap-6">
        <img alt="logo" src="./avatar.png" className="size-8 rounded-full" />
        <FaMessage size={20} />
        <MdNotifications size={20} />
      </div>
      <SearchBar />
    </div>
  );
}
