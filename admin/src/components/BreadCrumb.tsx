import { useLocation, Link } from "react-router";
import { AiOutlineRight } from "react-icons/ai";

const pathMap = {
  dashboard: "داشبورد",
  "new-post": "پست جدید",
  users: "کاربران",
  comments: "کامنت ها",
  requests: "درخواست ها",
  report: "خرابی",
};

const Breadcrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter(Boolean);

  return (
    <nav className="text-sm text-gray-300">
      <ol className="flex items-center space-x-1 rtl:space-x-reverse">
        {pathnames.map((segment, index) => {
          const isLast = index === pathnames.length - 1;
          const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
          const label = pathMap[segment as keyof typeof pathMap] ?? segment;

          return (
            <li
              key={index}
              className="flex items-center space-x-1 rtl:space-x-reverse"
            >
              {index !== 0 && (
                <AiOutlineRight className="text-gray-500 w-3.5 h-3.5 mx-1" />
              )}

              {isLast ? (
                <span className="text-gray-400">{label}</span>
              ) : (
                <Link
                  to={routeTo}
                  className="hover:text-white transition-colors duration-200"
                >
                  {label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
