import React from "react";
// import { useNavigate } from "react-router";
// import { useNavigate } from "react-router-dom";
// import NoteItem from "./notes/NoteItem";

const EditNote = ({ activeNote }) => {
  // console.log(activeNote);
  // const activeNote = <NoteItem item={<NoteItem item={item[activeNoteId]} activeNoteId={activeNoteId} />} activeNoteId={activeNoteId} />;

  return (
    <section className="flex flex-col flex-1 p-6 bg-[#e7e7e0] ">

    {/* <> */}
      <input
        // value={activeNote.title}
        value={activeNote?.title || "No title"}
        // value=
        // onChange={(e) =>
        //   setActiveNote({ ...activeNote, title: e.target.value }

        //   )
        // }
        className="text-2xl font-bold mb-4 outline-none"
      />

      <textarea
        value={activeNote?.content || "No content"}
        // onChange={(e) =>
        //   setActiveNote({ ...activeNote, content: e.target.value })
        // }
        className="flex-1 resize-none outline-none text-gray-700"
      />

      <div className="text-xs text-gray-400 mt-2">Auto-saving...</div>
    {/* </> */}

    // <p className="text-gray-400">Select a note to start editing</p>
    </section>
  );
};



export default EditNote;
