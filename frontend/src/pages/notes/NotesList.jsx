import axios from "axios";
import React, { useEffect, useState } from "react";
import AppLayout from "../../layouts/AppLayout";
import NoteItem from "../../components/notes/NoteItem";
import { set } from "react-hook-form";
import { useNavigate } from "react-router-dom";
// import EditNote from "../../components/EditNote";
import * as motion from "motion/react-client";
import toast from "react-hot-toast";
import { NOTE_DELETE_URL, NOTES_URL } from "../../utils/api";
import EditNote from "../../components/EditNote";
// import EditNote from "./EditNote";
// import styled from "styled-components";

// const notes_url = "http://localhost:5001/notes";

const NotesList = () => {
  const [notes, setNotes] = useState([]);
  const square = {
    width: "100%",
    height: "100%",
  };

  const getNotes = async () => {
    try {
      const response = await axios.get(NOTES_URL);
      if (response.data.status == true) {
        setNotes(response.data.notes);
        // console.log(response.data.notes);
        // console.log(response);
      } else {
        console.log("Failed to fetch data");
      }
    } catch (error) {
      console.log("ERR:", error);
    }
  };
  useEffect(() => {
    getNotes();
  }, []);

  const handleDelete = async (data) => {
    if (!confirm("Are you sure you want to delete this note?")) {
      return;
    }

    try {
      const response = await axios.delete(`${NOTE_DELETE_URL}/${data}`);

      if (response.data.status == true) {
        toast.success(response.data.message);
        await getNotes();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log("ERR:", error);
    }
  };

  const [activeNoteId, setActiveNoteId] = useState(0);

  const setNoteId = (id) => {
    setActiveNoteId(id);
  };

  return (
    <AppLayout
      sidebar={true}
      editor={null}
      children={null}
      list={
        notes.length == 0 ? (
          <div
          // className="col-span-12"
          >
            No records were found
          </div>
        ) : (
          notes.map((item, i) => {
            return (
              <div
                // className="w-1/3 border-r bg-gray-50 p-4 p-3 rounded-lg cursor-pointer border hover:bg-white transition"
                key={i}
                onClick={() => setNoteId(i)}
                // {(e) => setActiveNoteId({ ...item, activeNoteId: e.target.value })}
                // {() => setActiveNoteId(i)}

                //       className={`p-3 rounded-lg cursor-pointer border hover:bg-white transition

                // w-1/3 border-r bg-gray-50 p-4`}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.4,
                    scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
                  }}
                  style={square}
                >
                  <NoteItem
                    item={item}
                    handleDelete={() => handleDelete(item._id)}
                  />
                </motion.div>
              </div>
            );
          })
        )
      }
      editor={
        <EditNote activeNote={notes[activeNoteId]} />
        
    
        
      }
    />
  );
};

export default NotesList;

// const EditNote = styled.div`
// `;
