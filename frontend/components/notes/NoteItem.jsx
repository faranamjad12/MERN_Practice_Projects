import React from "react";

const NoteItem = ({item}) => {
  return (
    <>
     <h2 className="font-semibold">{item.title}</h2>
      <p className="text-sm text-gray-500 truncate">{item.content}</p> 
      </>
  );
};

export default NoteItem;
