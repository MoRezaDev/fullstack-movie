import { FaMessage, FaBars } from "react-icons/fa6";
import { MdNotifications } from "react-icons/md";
import SearchBar from "../../../components/SearchBar";
import { useState } from "react";
import MobileSidebar from "./MobileSidebar"; // make sure this import is correct based on your file structure

export default function Navbar() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="w-full h-18 bg-neutral-900 flex items-center justify-between px-4 py-3 border-b border-neutral-700 md:justify-start md:gap-6">
      {/* 🍔 Burger (only mobile) */}
      <button
        className="md:hidden text-white text-xl"
        onClick={() => setSidebarOpen(true)}
      >
        <FaBars />
      </button>

      {/* 👤 Avatar + Icons (always visible) */}
      <div className="flex items-center gap-4">
        <img alt="logo" src="./avatar.png" className="size-8 rounded-full" />
        <FaMessage size={20} className="text-white" />
        <MdNotifications size={22} className="text-white" />
      </div>

      {/* 🔍 Search (takes space on desktop) */}
      <div className="flex-1 ml-4 hidden md:block">
        <SearchBar />
      </div>

      {/* 🧱 Sidebar component */}
      <MobileSidebar
        isOpen={isSidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
    </div>
  );
}
