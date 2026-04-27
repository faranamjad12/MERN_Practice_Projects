import axios from "axios";
import React, { useEffect, useState } from "react";
// import AppLayout from ".../layouts/AppLayout";
import NoteItem from "../../components/notes/NoteItem";
import AppLayout from "../../layouts/AppLayout";

const notes_url = "http://localhost:5001/notes";

const NotesList = () => {
  const [notes, setNotes] = useState([]);

  const getNotes = async () => {
    try {
      const response = await axios.get(notes_url);
      if (response.data.status == true) {
        setNotes(response.data.notes);
        console.log(response.data.notes);
      } else {
        console.log("failed to retrieve data");
      }
    } catch (error) {
      console.log("ERR:", error);
    }
  };
  useEffect(() => {
    getNotes();
  }, []);

  return (
    <AppLayout>
      <div className="space-y-2">
        {notes.map((item, i) => {
          return (
            <div
              key={i}
              // onClick={() => setActiveNote(note)}
              className={`p-3 rounded-lg cursor-pointer border hover:bg-white transition 
            // $
            // {
            // activeNote.id === note.id ? "bg-white shadow" : ""
            // }
          `}
            >
              {/* <h2 className="font-semibold">{note.title}</h2>
                <p className="text-sm text-gray-500 truncate">{note.content}</p> */}
              <NoteItem item={item} />
            </div>
          );
        })}
      </div>
    </AppLayout>
  );
};

export default NotesList;
