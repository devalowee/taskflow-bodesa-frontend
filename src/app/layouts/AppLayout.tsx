import { Navigate, Outlet } from "react-router";
import { Sidebar } from "../components/Sidebar";
import { UseAuth } from "@/hooks/UseAuth";
import { Navbar } from "../components/Navbar";
import { Toaster } from "sonner";

export const AppLayout = () => {
  const { isAuthenticated } = UseAuth();

  if (isAuthenticated !== 'authenticated') {
    return <Navigate to="/auth/login" />;
  }

  return (
    <main className="flex">
      <Sidebar />
      <section className="flex flex-col w-full bg-gray-50 overflow-hidden">
      <Navbar />
      <div className="p-10 h-full">
        <Outlet />
        </div>
      </section>
      <Toaster />
    </main>
  );
};
