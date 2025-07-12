// Sidebar.tsx
import {
  FaTachometerAlt,
  FaUserFriends,
  FaCommentDots,
  FaPlusCircle,
  FaBug,
  FaInbox,
  FaFilm,
  FaChevronDown,
} from "react-icons/fa";
import { Link, useLocation } from "react-router";
import { useState } from "react";
import { FaNoteSticky } from "react-icons/fa6";

const menuItems = [
  { label: "کاربران", icon: <FaUserFriends />, to: "/users" },
  { label: "کامنت ها", icon: <FaCommentDots />, to: "/comments" },
  { label: "درخواستی ها", icon: <FaInbox />, to: "/requests" },
  { label: "خرابی", icon: <FaBug />, to: "/report" },
];

export default function Sidebar() {
  const location = useLocation();
  const [showSubMenu, setShowSubMenu] = useState(false);

  const toggleSubMenu = () => setShowSubMenu(!showSubMenu);

  return (
    <div className="hidden md:flex w-[180px] border-l border-l-neutral-600 min-h-screen bg-neutral-900 text-gray-300 flex-col items-center py-6 gap-8 shadow-md ">
      {/* Logo */}
      <div className="flex items-center gap-2 text-xl font-semibold text-white">
        <FaFilm className="text-[#38bdf8]" />
        <span className="tracking-wide">MoviePanel</span>
      </div>

      {/* Menu Items */}
      <nav className="flex flex-col gap-2 w-full px-4">
        {/* Dashboard First */}
        <Link
          to="/dashboard"
          className={`flex items-center gap-3 p-2 rounded-md text-sm transition-colors duration-200
            ${
              location.pathname === "/dashboard"
                ? "bg-[#1e90ff]/90 text-white font-bold"
                : "hover:bg-white/10"
            }`}
        >
          <span className="text-base">
            <FaTachometerAlt />
          </span>
          <span>داشبورد</span>
        </Link>
        <Link
          to="/posts/new"
          className={`flex items-center gap-3 p-2 rounded-md text-sm transition-colors duration-200
            ${
              location.pathname === "/posts/new"
                ? "bg-[#1e90ff]/90 text-white font-bold"
                : "hover:bg-white/10"
            }`}
        >
          <span className="text-base">
            <FaNoteSticky />
          </span>
          <span>افزودن پست</span>
        </Link>

        {/* New Post with SubMenu */}
        <div className="flex flex-col gap-1">
          <button
            onClick={toggleSubMenu}
            className={`flex items-center gap-3 p-2 rounded-md text-xs transition-colors duration-200 justify-between text-left w-full
              ${
                location.pathname.includes("/new-post")
                  ? "bg-[#1e90ff]/90 text-white font-bold"
                  : "hover:bg-white/10"
              }`}
          >
            <div className="flex items-center gap-3">
              <FaPlusCircle className="text-base" />
              <span>افزودن محتوا</span>
            </div>
            <FaChevronDown
              className={`transition-transform duration-300 ${
                showSubMenu ? "rotate-180" : "rotate-0"
              }`}
            />
          </button>

          <div
            className={`pl-6 overflow-hidden transition-all duration-300 ease-in flex flex-col gap-1 text-sm ${
              showSubMenu ? "max-h-40 mt-1" : "max-h-0"
            }`}
          >
            <Link
              to="/movies/new"
              className={`py-1 px-2 rounded-md transition-colors duration-200 ${
                location.pathname === "/movies/new"
                  ? "bg-[#1e90ff]/90 text-white font-bold"
                  : "hover:bg-white/10"
              }`}
            >
              فیلم
            </Link>
            <Link
              to="/movies/series"
              className={`py-1 px-2 rounded-md transition-colors duration-200 ${
                location.pathname === "/movies/series"
                  ? "bg-[#1e90ff]/90 text-white font-bold"
                  : "hover:bg-white/10"
              }`}
            >
              سریال
            </Link>
            <Link
              to="/movies/anime"
              className={`py-1 px-2 rounded-md transition-colors duration-200 ${
                location.pathname === "/movies/anime"
                  ? "bg-[#1e90ff]/90 text-white font-bold"
                  : "hover:bg-white/10"
              }`}
            >
              انیمه
            </Link>
          </div>
        </div>

        {/* Movies, Animes, Series Section */}
        
        <Link
          to="/dashboard"
          className={`flex items-center gap-3 p-2 rounded-md text-sm transition-colors duration-200
            ${
              location.pathname === "/dashboard"
                ? "bg-[#1e90ff]/90 text-white font-bold"
                : "hover:bg-white/10"
            }`}
        >
          <span className="text-base">
            <FaTachometerAlt />
          </span>
          <span>داشبورد</span>
        </Link>

        {/* Other Menu Items */}
        {menuItems.map((item, index) => {
          const isActive = location.pathname === item.to;

          return (
            <Link
              key={index}
              to={item.to}
              className={`flex items-center gap-3 p-2 rounded-md text-sm transition-colors duration-200
                ${
                  isActive
                    ? "bg-[#1e90ff]/90 text-white font-bold"
                    : "hover:bg-white/10"
                }`}
            >
              <span className="text-base">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
