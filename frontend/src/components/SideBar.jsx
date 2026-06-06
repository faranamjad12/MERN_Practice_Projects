import React from "react";
import { GoPlus } from "react-icons/go";
import { Link, useNavigate } from "react-router";
import ActionButton from "./ActionButton";
import { useAuth } from "../context/AuthContext";

const SideBar = () => {
  const { user, logout } = useAuth();

  const navigate = useNavigate();

  const handleLogout = () => {
    // Implement logout logic here
    // console.log("Logout clicked");
    // navigate("/login");
    logout();
  };

  return (
    <aside className="w-64 bg-white border-r p-4 flex flex-col">
      <h1 className="text-xl font-bold mb-6">Notes</h1>

      <Link
        to={"/notes/add"}
        className="  bg-indigo-500 text-white py-2 rounded-lg mb-4  items-center  hover:bg-indigo-600 transition"
      >
        <GoPlus size={22} className="inline -mt[3px]" />
        <span>New Note</span>
      </Link>

      <nav className="space-y-2 text-sm">
        <p className="font-medium">All Notes</p>
        <p className="text-gray-500">Favorites</p>
        <p className="text-gray-500">Archived</p>
        <p className="text-gray-500">Trash</p>
      </nav>
      <div className="bottom-btn mt-auto">
      <p className='font-medium text-sm bg-gray-200 px-3 py-1 rounded-full'>{user.name}  {user.email}
        <ActionButton text="Logout" className='mt-auto ml-3 cursor-pointer bg-gray-900 hover:bg-gray-200 
          transition-colors text-md text-gray-200 
          hover:text-gray-800 font-medium px-3 py-1 rounded-full' onClick={handleLogout} />
        </p>
      </div>
    </aside>
  );
};

export default SideBar;
