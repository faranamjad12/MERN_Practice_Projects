import express from "express";
import { list } from "./notes.controller.js";

const notesRouter = express.Router();

notesRouter.get("/notes", list);

export default notesRouter;
