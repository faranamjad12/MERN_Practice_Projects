import express from "express";
import {
  add,
  deleteNote,
  list,
  editNote,
  updateNote,
} from "./notes.controller.js";
import { authMiddleware } from "../../middlewares/authMiddleware.js";

const notesRouter = express.Router();

notesRouter.get("/notes", list);
notesRouter.post("/notes/create", authMiddleware, add);
notesRouter.delete("/notes/delete/:id", authMiddleware, deleteNote);
notesRouter.get("/notes/edit/:id", editNote);
notesRouter.patch("/notes/update", updateNote);

export default notesRouter;
