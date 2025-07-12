import { Outlet } from "react-router";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Toaster />
        <div className="flex">
          <Sidebar />
          <div className="flex-1 min-h-screen">
            <Navbar />
            <Outlet />
          </div>
        </div>
        <Footer />
      </QueryClientProvider>
    </>
  );
}
