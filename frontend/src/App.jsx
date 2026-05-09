import React from "react";
import { Routes, Route } from "react-router";
import NotesList from './pages/notes/NotesList'
import AddNote from './pages/notes/AddNote'
import EditNote from './pages/notes/EditNote'
import Signup from './pages/auth/Signup'
import Login from './pages/auth/Login'


const App = () => {
  return (
    <Routes>
      {/* Authentication Routes */}
      <Route path="/register" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<NotesList />} />
      <Route path="/" element={<NotesList />} />

      <Route path="/notes/add" element={<AddNote />} />
      <Route path="/notes/edit/:id" element={<EditNote />} />
      <Route path="/" element={<NotesList />} />
    </Routes>
  );
};
export default App;
