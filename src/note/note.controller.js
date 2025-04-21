import UserModel from "../../DB/models/user.model.js";
import Note from "../../DB/models/note.model.js";
import { ErrorHandleClass } from "../utils/error-class.utils.js";

export const addNote = async (req, res, next) => {
  const { title, desc } = req.body;
  // find user
  const isUserExist = await UserModel.findById(req.authUser._id);
  if (!isUserExist)
    return next(
      new ErrorHandleClass(
        "User NotFound",
        404,
        "add note in note controller",
      )
    );
  //create
  const note = await Note.create({ title, desc, owner:req.authUser._id });
  //response
  return res.json({
    message: "note added successfully",
    data: { title: note.title, desc: note.desc, owner: note.owner ,id:note._id},
  });
};

export const updateNote = async (req, res, next) => {
  const { noteId } = req.params;
  const userId = req.authUser._id.toString();
  const { title, desc } = req.body;
  const updateNote = await Note.findOneAndUpdate(
    { _id: noteId, owner: userId },
    { title, desc },
    { new: true }
  );

  if (!updateNote)
    return next(
      new ErrorHandleClass(
        "Note NotFound",
        404,
        "update note in note controller",
        { noteId, userId }
      )
    );
  return res.status(200).json({
    message: "Note Updated Successfully",
    data: { title: updateNote.title, desc: updateNote.desc },
  });
};

export const deleteNote = async (req, res, next) => {
  //dosen't accuret
  const { id } = req.params;
  const { _id } = req.authUser;
  const note = await Note.find({ $and: [{ _id: id }, { owner: _id }] });
  console.log(note);
  if (!note)
    return next(
      new ErrorHandleClass(
        "Note NotFound",
        404,
        "delete note in note controller",
        { id }
      )
    );

  return res
    .status(200)
    .json({ message: "Note deleted successfully", data: note });
};


export const getNoteById = async (req, res, next) => {
  const { id } = req.params; //note id
  const note = await Note.findById(id);
  if (!note)
    return next(
      new ErrorHandleClass(
        "invalid ID ",
        404,
        "invalid ID",
        "error from getnoteById controller",
        { id }
      )
    );
  return res.status(200).json({
    message: "Note is",
    data: { title: note.title, desc: note.desc },
  });
};

export const getNotesByUserId = async (req, res) => {
  const notes = await Note.find({ owner: req.authUser._id });
  if (!notes[0])
    return next(
      new ErrorHandleClass(
        "user don't have notes",
        404,
        "get notes by user id in note controller"
      )
    );

  return res
    .status(200)
    .json({ message: "All notes of this user", data: notes });
};
