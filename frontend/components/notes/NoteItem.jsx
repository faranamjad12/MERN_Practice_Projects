import React from "react";

const NoteItem = ({ item }) => {
  // const activeNoteId = item.id;
  // console.log(activeId);
  return (
    <div style={{ backgroundColor: item.color }}>
      <h2 className="font-semibold">{item.title}</h2>
      <p className="text-sm text-gray-500 truncate">{item.content}</p>
    </div>
  );
};

export default NoteItem;
