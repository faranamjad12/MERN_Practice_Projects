import axios from "axios";
import React, { useEffect, useState } from "react";
import AppLayout from "../../layouts/AppLayout";
import { GoArrowLeft } from "react-icons/go";
import { Link } from "react-router";
import TextInput from "../../components/TextInput";
import TextArea from "../../components/TextArea";
import { useForm } from "react-hook-form";

const notes_url = "http://localhost:5001/notes";

const AddNote = () => {
  const [notes, setNotes] = useState([]);
  const [colors, setColor] = useState("#FEC971");
  const { register, handleSubmit, reset } = useForm();

  const noteClrs = ["#FEC971", "#FE9B72", "#E4EF8F", "#B391F9", "#0AB8DE"];

  const handleColor = (e, clr) => {
    e.preventDefault();
    setColor(clr);
    console.log(clr);
  };

  const handleAddNote = async (data) => {
    try {
      const newData = {
        title: data.title,
        content: data.content,
        color: color,
      };
    } catch (error) {
      console.log("ERR:", error);
    }
  };

  return (
    // <AppLayout>
    <AppLayout
      
      // sidebar={true}
      list={null}
      editor={null}
      
      
       children={ 
        <div>
        <Link to={"/"} className="flex items-center gap-3 mb-4">
          <GoArrowLeft /> <span>Back to list</span>
        </Link>
        <h2 className="text-4xl font-bold mb[50px]">Add Note</h2>
        <div className="">
          <form onSubmit={handleSubmit(handleAddNote)}>
            <div>
              <label htmlFor="" className="block">
                Color
              </label>
              <div className="flex gap-3">
                {noteClrs.map((clr) => {
                  return (
                    <button
                      style={{ backgroundColor: clr }}
                      onClick={(e) => handleColor(e, clr)}
                      className="p-1 rounded focus:border focus:scale-125"
                    >
                      {clr}
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="mt-4">
              <label htmlFor="">Title</label>
              <TextInput
                type="text"
                {...register("title")}
                hint="Enter note title"
                className="py-2 px-4 rounded-lg w-full border border-gray-300 bg-gray-100"
              />
            </div>

            <div className="my-4">
              <label htmlFor="">Content</label>
              <TextArea
                {...register("content")}
                hint="Enter note content"
                rows={10}
                className="py-2 px-4 rounded-lg w-full border border-gray-300 bg-gray-100"
              />
            </div>

            <div>
              <button className="bg-gray-900 text-white py-4 px-6 rounded-lg shadow font-bold">
                Add new note
              </button>
            </div>
          </form>
        </div>
        </div>
      }
    // </AppLayout>
    />
  );
};

export default AddNote;
