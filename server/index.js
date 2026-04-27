import express from "express";
// import colorRouter from "../extra's/routes/color.route.js";
import cors from "cors";
import notesRouter from "./modules/notes/notes.route.js";

const app = express();
const PORT = 5001;

app.use(cors());

app.use("", notesRouter);

// app.use("", colorRouter);

app.get("/", (req, res) => {
  return res.send({
    status: true,
    message: "server is running",
  });
});

app.listen(PORT, () => {
  console.log(`server is running at localhost:${PORT}`);
});

// export default index;
