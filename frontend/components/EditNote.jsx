import React from "react";

const EditNote = () => {
  return (
    <section className="flex-1 p-6 bg-white flex flex-col">
      {/* {activeNote ? (
        <>
          <input
            value={activeNote.title}
            onChange={(e) =>
              setActiveNote({ ...activeNote, title: e.target.value })
            }
            className="text-2xl font-bold mb-4 outline-none"
          />

          <textarea
            value={activeNote.content}
            onChange={(e) =>
              setActiveNote({ ...activeNote, content: e.target.value })
            }
            className="flex-1 resize-none outline-none text-gray-700"
          />

          <div className="text-xs text-gray-400 mt-2">Auto-saving...</div>
        </>
      ) : (
        <p className="text-gray-400">Select a note to start editing</p>
      )} */}
    </section>
  );
};

export default EditNote;
