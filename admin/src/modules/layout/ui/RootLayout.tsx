import { Outlet } from "react-router";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Sidebar from "./Sidebar";

export default function RootLayout() {
  return (
    <>
      <div className="flex">
        <Sidebar />
        <div className="flex-1 h-screen">
          <Navbar />
          <Outlet />
        </div>
      </div>
      <Footer />
    </>
  );
}
