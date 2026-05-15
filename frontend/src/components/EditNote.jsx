import React from "react";
import TextInput from "./TextInput";
import SpeechToText from "./SpeechToText";

const EditNote = ({ activeNote }) => {
  return (
    <section className="flex flex-col flex-1 p-6 bg-[#e7e7e0] ">
      <div>
        <SpeechToText />
      </div>

      
      <div className="flex flex-col relative pt-[150px]">
        {/* <input */}
        Old Title
      <TextInput
        type="text"
        hint={activeNote?.title || "No title"}
        // value={activeNote?.title || "No title"}
        className="text-2xl font-bold mb-4 outline-none"
        borderColor="none"
      />
      {/* <textarea
        value={activeNote?.content || "No content"}
        className="flex-1 resize-none outline-none text-gray-700"
      /> */}
        Old Content
      <TextInput
        type="text"
        hint={activeNote?.content || "No content"}
        // value={activeNote?.content || "No content"}
        className="flex  font-bold resize-none outline-none text-gray-700"
        borderColor="none"
      />
</div>
      {/* <div className="mt-auto text-xs text-gray-400 mt-2">Auto-saving...</div> */}
      <p className="mt-auto text-gray-400">Select a note to start editing</p>
    </section>
  );
};

export default EditNote;
