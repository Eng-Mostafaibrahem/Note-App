import express from "express";
import { connection_db } from "./DB/connectiondb.js";
import userRouter from "./src/user/user.routes.js";
import noteRouter from "./src/note/note.routes.js";
import { globalResponse } from "./src/Middlewares/error-handde.middleware.js";
import { config } from "dotenv";
import path from "path";
import NoteModel from "./DB/models/note.model.js";

config();

const app = express();
let port = process.env.PORT || 5000;
app.use(express.json());
app.use("/user", userRouter);
app.use("/note", noteRouter);
app.use("", (req, res) => res.json({ message: "TEST DEPLOY" }));
app.get("/test-db", async (req, res) => {
  try {
    const notes = await NoteModel.find();
    res.json({ status: "success", notes });
  } catch (err) {
    res.status(500).json({ status: "fail", error: err.message });
  }
});
// app.use("/src/uploads", express.static(path.resolve("src/uploads/")))
app.use(globalResponse);

connection_db();

app.listen(port, () => console.log("server is running on port " + port));
