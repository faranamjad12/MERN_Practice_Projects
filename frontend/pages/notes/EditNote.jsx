import axios from "axios";
import React, { useEffect, useState } from "react";
import AppLayout from "../../layouts/AppLayout.jsx";
// from '../../layouts/AppLayout.jsx';
import NoteItem from "../../components/notes/NoteItem.jsx";
// from '../../components/notes/NoteItem.jsx';
import { GoArrowLeft } from "react-icons/go";
import { Link, useNavigate, useParams } from "react-router";
import TextInput from "../../components/TextInput.jsx";
// from '../../components/TextInput.jsx';
import TextArea from "../../components/TextArea.jsx";
// from '../../components/TextArea.jsx';
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { NOTE_EDIT_URL, NOTE_UPDATE_URL } from "../../src/utils/api.js";

const EditNote = () => {
  const [color, setColor] = useState("#FEC971");
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();
  const params = useParams();

  const activeNoteCss = "border border-2";

  const noteClrs = ["#FEC971", "#FE9B72", "#E4EF8F", "#B391F9", "#0AB8DE"];

  const handleColor = (e, clr) => {
    e.preventDefault();
    setColor(clr);
    console.log(clr);
  };

  useEffect(() => {
    const getSingleNote = async () => {
      try {
        const response = await axios.get(NOTE_EDIT_URL + `/${params.id}`);
        if (response.data.status == true) {
          console.log(response.data.note);
          setColor(response.data?.note?.color);
          reset(response.data.note);
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error("Internal server error");
        console.log("ERR: ", error);
      }
    };
    getSingleNote();
  }, [params.id]);

  const handleEditNote = async (data) => {
    try {
      const newData = {
        id: params.id,
        color: color,
        title: data.title,
        content: data.content,
      };

      const response = await axios.patch(NOTE_UPDATE_URL, newData);
      if (response.data.status == true) {
        toast.success(response.data.message);
        navigate("/");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Network error");
      console.log("ERR: ", error);
    }
  };

  return (
      <AppLayout
      editor={null}
      list={null}

      //   >
      children={
      <div>
        <Link to={"/"} className="flex items-center gap-3 mb-4">
          <GoArrowLeft /> <span>Back to list</span>
        </Link>
        <h2 className="text-4xl font-bold mb-[50px]">
          Edit Note - [#] {params.id}{" "}
        </h2>
        <div className="">
          <form onSubmit={handleSubmit(handleEditNote)}>
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
                      className={`p-1 rounded focus:border focus:scale-125 ${color == clr && activeNoteCss}`}
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
                Update note
              </button>
            </div>
          </form>
        </div>
      </div>
      }
      />
    // </AppLayout>
  );
};

export default EditNote;
