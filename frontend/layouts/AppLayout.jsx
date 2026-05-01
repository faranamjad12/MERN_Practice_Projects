import React, { act } from "react";
import SideBar from "../components/SideBar";
import EditNote from "../components/EditNote";
import NoteItem from "../components/notes/NoteItem";

const AppLayout = ({ children, list, editor, sidebar = true }) => {
  return (
    <div className="h-screen flex bg-gray-50 text-gray-900">
      {/* Sidebar */}
      {/* {sidebar !== false ? <SideBar /> : null} */}
      {sidebar && <SideBar />}
      {/* Notes List (Page Content) */}
      {/* {list !== null ? ( */}
      {list && <main
        // className="w-full border-r bg-gray-50 p-4"
        className=" space-y-2 p-3 rounded-lg cursor-pointer border hover:bg-white transition 
            
            w-1/3 border-r bg-gray-50 p-4"
      >{list}</main>}
      {/* Content */}
      {/* {children !== null ? ( */}
      {children && (
        <main className="w-1/3 border-r bg-gray-50 p-4">{children}</main>
      )}
      {/* Editor */}
      {
        editor && (
          <section className="flex-1 p-6 bg-white flex flex-col">
            {/* <EditNote activeNote={activeNote} /> */}
            {editor}
          </section>
        )
        // : null
      }
    </div>
  );
};
export default AppLayout;
