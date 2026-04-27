import React from "react";
import SideBar from "../components/SideBar";
import EditNote from "../components/EditNote";


const AppLayout = ({ children }) => {
  return (
    <div className="h-screen flex bg-gray-50 text-gray-900">
      {/* Sidebar */}
      <SideBar />

      {/* Topbar */}

      {/* Notes List (Page Content) */}
      <main className="w-1/3 border-r bg-gray-50 p-4">{children}</main>

      {/* Editor */}
      <EditNote />
    </div>
  );
};

export default AppLayout;
