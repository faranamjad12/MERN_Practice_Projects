import React from "react";
import { Routes, Route } from "react-router";
import AddNote from './pages/notes/AddNote'
import NotesList from './pages/notes/NotesList'
import EditNote from "./pages/notes/EditNote";


const App = () => {
  return (
    <Routes>
      <Route path="/" element={<NotesList />} />
      <Route path="/notes/add" element={<AddNote />} />
      <Route path='/notes/edit/:id' element={<EditNote />}/>
      <Route path="/" element={<NotesList />} />
    </Routes>
  );
};
export default App;
