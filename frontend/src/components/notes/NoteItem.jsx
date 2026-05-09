import React from "react";
import { GoPencil, GoTrash } from "react-icons/go";
import { Link } from "react-router";
import toast from "react-hot-toast";
import axios from "axios";
import { NOTE_DELETE_URL } from "../../utils/api.js";

const NoteItem = ({ item, handleDelete }) => {
  return (
    <div style={{ backgroundColor: item.color }}>
      <div>
        <h2 className="font-semibold">{item.title}</h2>
      </div>
      <p className="text-sm text-gray-500 truncate">
        {item.content}

        <span>
          {
            <Link
              to={`/notes/edit/${item._id}`}
              // className='p-2 shadow cursor-pointer bg-white rounded-full'
            >
              <GoPencil size={20} />
            </Link>
          }

          {
            <button
              onClick={() => handleDelete(item._id)}
              // className='p-2 shadow cursor-pointer bg-white rounded-full'
            >
              <GoTrash size={20} />
            </button>
          }
        </span>
      </p>
    </div>
  );
};

export default NoteItem;
