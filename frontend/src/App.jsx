import React from "react";
import { Routes, Route } from "react-router";
import NotesList from "../pages/notes/NotesList";
import AddNote from "../pages/notes/AddNote";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<NotesList />} />
      <Route path="/notes/add" element={<AddNote />} />
      <Route path="/" element={<NotesList />} />
    </Routes>
  );
};

export default App;
// ----
// import { useState } from "react";

// export default function App() {
//   const [notes, setNotes] = useState([
//     {
//       id: 1,
//       title: "First Note",
//       content: "This is a sample note",
//       pinned: false,
//     },
//     { id: 2, title: "Ideas", content: "Build a notes app UI", pinned: true },
//   ]);

//   const [activeNote, setActiveNote] = useState(notes[0]);

//   return (
//     <div className="h-screen flex bg-gray-50 text-gray-900">
//       {/* Sidebar */}
//       <aside className="w-64 bg-white border-r p-4 flex flex-col">
//         <h1 className="text-xl font-bold mb-6">Notes</h1>

//         <button className="bg-indigo-500 text-white py-2 rounded-lg mb-4 hover:bg-indigo-600 transition">
//           + New Note
//         </button>

//         <nav className="space-y-2 text-sm">
//           <p className="font-medium">All Notes</p>
//           <p className="text-gray-500">Favorites</p>
//           <p className="text-gray-500">Archived</p>
//           <p className="text-gray-500">Trash</p>
//         </nav>
//       </aside>

//       {/* Notes List */}
//       <main className="w-1/3 border-r bg-gray-50 p-4">
//         <input
//           placeholder="Search..."
//           className="w-full mb-4 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
//         />

//         <div className="space-y-2">
//           {notes.map((note) => (
//             <div
//               key={note.id}
//               onClick={() => setActiveNote(note)}
//               className={`p-3 rounded-lg cursor-pointer border hover:bg-white transition ${
//                 activeNote.id === note.id ? "bg-white shadow" : ""
//               }`}
//             >
//               <h2 className="font-semibold">{note.title}</h2>
//               <p className="text-sm text-gray-500 truncate">{note.content}</p>
//             </div>
//           ))}
//         </div>
//       </main>

//       {/* Editor */}
//       <section className="flex-1 p-6 bg-white flex flex-col">
//         {activeNote ? (
//           <>
//             <input
//               value={activeNote.title}
//               onChange={(e) =>
//                 setActiveNote({ ...activeNote, title: e.target.value })
//               }
//               className="text-2xl font-bold mb-4 outline-none"
//             />

//             <textarea
//               value={activeNote.content}
//               onChange={(e) =>
//                 setActiveNote({ ...activeNote, content: e.target.value })
//               }
//               className="flex-1 resize-none outline-none text-gray-700"
//             />

//             <div className="text-xs text-gray-400 mt-2">Auto-saving...</div>
//           </>
//         ) : (
//           <p className="text-gray-400">Select a note to start editing</p>
//         )}
//       </section>
//     </div>
//   );
// }
