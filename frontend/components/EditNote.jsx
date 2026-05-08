import React from "react";

const EditNote = ({ activeNote }) => {
  return (
    <section className="flex flex-col flex-1 p-6 bg-[#e7e7e0] ">
      <input
        value={activeNote?.title || "No title"}
        className="text-2xl font-bold mb-4 outline-none"
      />
      <textarea
        value={activeNote?.content || "No content"}
        className="flex-1 resize-none outline-none text-gray-700"
      />
      <div className="text-xs text-gray-400 mt-2">Auto-saving...</div>
      // <p className="text-gray-400">Select a note to start editing</p>
    </section>
  );
};

export default EditNote;
