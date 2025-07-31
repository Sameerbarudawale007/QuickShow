import React from "react";
import AdminNavbar from "../../components/admin/AdminNavbar";
import AdminSlidebar from "../../components/admin/AdminSlidebar";
import { Outlet } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import { useEffect } from "react";

const Layout = () => {
  const { isAdmin, fetchIsAdmin } = useAppContext();

  useEffect(() => {
    fetchIsAdmin();
  }, []);

  return isAdmin ? (
    <>
      <AdminNavbar />
      <div className="flex">
        <AdminSlidebar />
        <div className="flex-1 px-4 py-10 md:px-10 h-[calc(100vh-64px)] overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </>
  ) : (
    <div>Loading...</div>
  );
};

export default Layout;
