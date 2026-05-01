import axios from "axios";
import React, { useEffect, useState } from "react";
import AppLayout from "../../layouts/AppLayout";
import NoteItem from "../../components/notes/NoteItem";
import { set } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import EditNote from "../../components/EditNote";
import styled from "styled-components";

const notes_url = "http://localhost:5001/notes";

const NotesList = () => {
  const [notes, setNotes] = useState([]);

  const getNotes = async () => {
    try {
      const response = await axios.get(notes_url);
      if (response.data.status == true) {
        setNotes(response.data.notes);
        // console.log(response.data.notes);
        // console.log(notes);
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

  // const [activeNote, setActiveNote] = useState(notes[0]);

  // console.log(activeNote);
  // const setActiveNote = (note) => {
  //    setActiveNote(true);
  //   const activeNoteData = {
  //     id: note.id,
  //     title: note.title,
  //     content: note.content,
  //     color: note.color,
  //     date: note.date,
  //   };
  //   return activeNoteData;
  // };
  // async
  // const setNoteId = (e, id) => {
  // try {

  // e.stopPropagation();
  // e.preventDefault();
  // setActiveNoteId(id);
  // console.log(activeNoteId);
  // return false;
  // } catch (error) {
  //   console.log("ERR:", error);
  // }
  // };
  // window.
  const [activeNoteId, setActiveNoteId] = useState(1);

  //   ,() => {
  //   return localStorage.getItem("activeNoteId") || null;
  // });

  // const navigate = useNavigate();
  // navigate("/");

  const setNoteId = (id) => {
    // const navigate = useNavigate();

    setActiveNoteId(id);
    // localStorage.setItem("activeNoteId", id);
    // console.log(id);
    console.log(id);
    // navigate(`/`, { replace: true });
    // return false;
  };

  //   const setNoteId = () => {
  //     useEffect(() => {
  //       const setId = (id) => {
  //         setActiveNoteId(id);
  //         console.log(activeNoteId);
  // }
  //       setNoteId(id);
  //     }, []);
  //   };

  //   const setNoteId ={ async ( (id) => {
  //     setActiveNoteId(id);
  //     // console.log(activeNoteId);
  //   }
  // ,[])=> {}};

  // const setNoteId = (id) => {
  //   try {
  //     setActiveNoteId(id);
  // console.log(activeNoteId);
  // return activeNoteId;
  // } catch (error) {
  // console.log("ERR:", error);
  //   }
  // };
  // console.log(activeNoteId);
  // useEffect(() => {
  //   setNoteId(activeNoteId);

  // }, []);

  // console.log(activeNoteId);
  // const handleColor = (e, clr) => {
  //   e.preventDefault();
  //   setColor(clr);
  //   console.log(clr);
  // };

  return (
    // <AppLayout>

    (
      // (
        <AppLayout
          editor={null}
          children={null}
          list={
            // <div className="space-y-2"> 
            // // {
            // Array.isArray(notes) && notes.length > 0 ?

            // notes?.notes?.

            // console.log(notes),
            notes.map((item, i) => {
              return (
                <div
                  // className="w-1/3 border-r bg-gray-50 p-4 p-3 rounded-lg cursor-pointer border hover:bg-white transition"
                  // key={i}
                  onClick={() => setNoteId(item.id)}
            //       className={`p-3 rounded-lg cursor-pointer border hover:bg-white transition 
            
            // w-1/3 border-r bg-gray-50 p-4`}
                >
                  <NoteItem item={item} />
                  {/* <NoteItem item={{ title: "Test note" }} /> */}
                </div>
              );
            })
            // : null
          }
          // </ div >
        // }
        

          editor={
            <EditNote
              activeNote={notes[activeNoteId - 1]}
              // activeNote={notes.find(n => n.id === (activeNoteId-1))}
            />
          }




        />
      // ),
      
    )
    // </div>
    // }

    // </div>

    // </AppLayout>
  );
};

export default NotesList;

// const EditNote = styled.div`
// `;
