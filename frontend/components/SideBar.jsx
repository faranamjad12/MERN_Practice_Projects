import React from "react";
import { GoPlus } from "react-icons/go";
import { Link } from "react-router";

const SideBar = () => {
  return (
    <aside className="w-64 bg-white border-r p-4 flex flex-col">
      <h1 className="text-xl font-bold mb-6">Notes</h1>

      <Link to={'/notes/add'} className="bg-indigo-500 text-white py-2 rounded-lg mb-4 hover:bg-indigo-600 transition">
       <GoPlus size={22} className="inline -mt[3px]"/><span>New Note</span>
      </Link>

      <nav className="space-y-2 text-sm">
        <p className="font-medium">All Notes</p>
        <p className="text-gray-500">Favorites</p>
        <p className="text-gray-500">Archived</p>
        <p className="text-gray-500">Trash</p>
      </nav>
    </aside>
  );
};

export default SideBar;
