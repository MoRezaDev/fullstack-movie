// Sidebar.tsx
import {
  FaTachometerAlt,
  FaUserFriends,
  FaCommentDots,
  FaPlusCircle,
  FaBug,
  FaInbox,
  FaFilm,
} from "react-icons/fa";
import { Link, useLocation } from "react-router";

const menuItems = [
  { label: "داشبورد", icon: <FaTachometerAlt />, to: "/dashboard" },
  { label: "پست جدید", icon: <FaPlusCircle />, to: "/new-post" },
  { label: "کاربران", icon: <FaUserFriends />, to: "/users" },
  { label: "کامنت ها", icon: <FaCommentDots />, to: "/comments" },
  { label: "درخواستی ها", icon: <FaInbox />, to: "/requests" },
  { label: "خرابی", icon: <FaBug />, to: "/report" },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <div className="w-[240px] border-l border-l-neutral-600 h-screen bg-neutral-900 text-gray-300 flex flex-col items-center py-6 gap-8 shadow-md">
      {/* Logo */}
      <div className="flex items-center gap-2 text-xl font-semibold text-white">
        <FaFilm className="text-[#38bdf8]" />
        <span className="tracking-wide">MoviePanel</span>
      </div>

      {/* Menu Items */}
      <nav className="flex flex-col gap-2 w-full px-4">
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
                }
              `}
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
