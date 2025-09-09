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
import { useEffect, useState } from "react";
import { BiMovie } from "react-icons/bi";

export default function MobileSidebar({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const location = useLocation();
  const [showSubMenu, setShowSubMenu] = useState(false);

  // Auto-close on route change
  useEffect(() => {
    onClose();
  }, [location.pathname]);

  const toggleSubMenu = () => setShowSubMenu(!showSubMenu);

  return (
    <div
      className={`fixed inset-0 -z-1 bg-black/50 transition-opacity duration-300 ${
        isOpen ? "opacity-100 z-40 " : "opacity-0"
      } md:hidden`}
    >
      <div
        className={`absolute right-0 top-0 h-full w-64 bg-neutral-900 text-gray-300 p-6 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Logo */}
        <div className="flex items-center gap-2 text-lg font-semibold text-white mb-6">
          <FaFilm className="text-green-500" />
          <span className="tracking-wide">MoviePanel</span>
        </div>

        {/* Menu */}
        <nav className="flex flex-col gap-3">
          {/* Dashboard */}
          <Link
            to="/dashboard"
            className={`flex items-center gap-3 p-2 rounded-md text-sm transition-colors duration-200 ${
              location.pathname === "/dashboard"
                ? "bg-green-600 text-white "
                : "hover:bg-white/10"
            }`}
          >
            <FaTachometerAlt />
            <span>داشبورد</span>
          </Link>

          {/* New Post with SubMenu */}
          <div className="flex flex-col gap-1">
            <button
              onClick={toggleSubMenu}
              className={`flex items-center justify-between gap-3 p-2 rounded-md text-sm transition-colors duration-200 w-full ${
                location.pathname.includes("/new-post")
                  ? "bg-green-600 text-white "
                  : "hover:bg-white/10"
              }`}
            >
              <div className="flex items-center gap-3">
                <FaPlusCircle />
                <span>پست جدید</span>
              </div>
              <FaChevronDown
                className={`transition-transform duration-300 ${
                  showSubMenu ? "rotate-180" : "rotate-0"
                }`}
              />
            </button>

            <div
              className={`pl-6 overflow-hidden transition-all duration-300 ease-in-out flex flex-col gap-1 text-sm ${
                showSubMenu ? "max-h-40 mt-1" : "max-h-0"
              }`}
            >
              <Link
                to="/new-post/movie"
                className={`py-1 px-2 rounded-md transition-colors duration-200 ${
                  location.pathname === "/new-post/movie"
                    ? "bg-green-600 text-white "
                    : "hover:bg-white/10"
                }`}
              >
                فیلم
              </Link>
              <Link
                to="/new-post/series"
                className={`py-1 px-2 rounded-md transition-colors duration-200 ${
                  location.pathname === "/new-post/series"
                    ? "bg-green-600 text-white "
                    : "hover:bg-white/10"
                }`}
              >
                سریال
              </Link>
              <Link
                to="/new-post/anime"
                className={`py-1 px-2 rounded-md transition-colors duration-200 ${
                  location.pathname === "/new-post/anime"
                    ? "bg-green-600 text-white "
                    : "hover:bg-white/10"
                }`}
              >
                انیمه
              </Link>
            </div>
          </div>

          {/* Other Menu Items */}
          {[
            { label: "فیلم ها", icon: <BiMovie />, to: "/movies" },
            { label: "سریال ها", icon: <BiMovie />, to: "/series" },
            { label: "انیمه ها", icon: <BiMovie />, to: "/animes" },

            { label: "کاربران", icon: <FaUserFriends />, to: "/users" },
            { label: "کامنت ها", icon: <FaCommentDots />, to: "/comments" },
            { label: "درخواستی ها", icon: <FaInbox />, to: "/requests" },
            { label: "خرابی", icon: <FaBug />, to: "/report" },
          ].map((item, index) => (
            <Link
              key={index}
              to={item.to}
              className={`flex items-center gap-3 p-2 rounded-md text-sm transition-colors duration-200 ${
                location.pathname === item.to
                  ? "bg-green-600 text-white "
                  : "hover:bg-white/10"
              }`}
            >
              <span className="text-base">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>

      {/* Click outside to close */}
      <div className="w-full h-full" onClick={onClose}></div>
    </div>
  );
}
