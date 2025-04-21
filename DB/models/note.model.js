import mongoose, { Schema } from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      unique: true,
      required: true,
    },
    desc: String,
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const NoteModel = mongoose.model("Note", noteSchema);

export default NoteModel;
