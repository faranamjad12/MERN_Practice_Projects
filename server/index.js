import express from "express";
// import colorRouter from "../extra's/routes/color.route.js";
import cors from "cors";
import notesRouter from "./modules/notes/notes.route.js";
import { connectDB } from "./config/db.js";
import authRouter from "./modules/auth/auth.route.js";

const app = express();
const PORT = 5001;
app.use(express.json());
app.use(cors());

app.use("", notesRouter);
app.use('', authRouter)

// app.use("", colorRouter);

app.get("/", (req, res) => {
  return res.send({
    status: true,
    message: "server is running",
  });
});

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`server is running at localhost:${PORT}`);
  });
});
// export default index;
