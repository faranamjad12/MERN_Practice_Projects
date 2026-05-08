import React from "react";
import SideBar from "../components/SideBar";
import EditNote from "../components/EditNote";

const AppLayout = ({ children, list, editor, sidebar = true }) => {
  return (
    <div className="h-screen flex bg-gray-50 text-gray-900">
      {sidebar && <SideBar />}

      {list && (
        <main
          // className="w-full border-r bg-gray-50 p-4"
          className=" space-y-2 p-3 rounded-lg cursor-pointer border hover:bg-white transition 
            
            w-1/3 border-r bg-gray-50 p-4"
        >
          {list}
        </main>
      )}

      {children && (
        <main className="w-full border-r bg-gray-50 p-4">{children}</main>
      )}

      {editor && (
        <section className="flex-1 p-6 bg-white flex flex-col">
          {editor}
        </section>
      )}
    </div>
  );
};
export default AppLayout;
