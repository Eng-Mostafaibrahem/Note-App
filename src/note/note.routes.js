import { Router } from "express";
import * as noteController from "./note.controller.js";
import { auth } from "../Middlewares/auth.middleware.js";
import { errorHandle } from "../Middlewares/error-handde.middleware.js";
import { authorization } from "../Middlewares/authorization.middleware.js";
import { role } from "../utils/system-role.utils.js";
import { multerMidleware } from "../Middlewares/multer.middleware.js";
import { extensions } from "../utils/file-extension.utils.js";



const router = Router();
// router.get("/LISTNOTE",multerMidleware(),errorHandle(noteController.getNotes));
router.post(
  "/add",
  errorHandle(auth()),
  errorHandle(authorization(role.USER_ROLES)),
  errorHandle(noteController.addNote)
);
router.put(
  "/update/:noteId",
  errorHandle(auth()),
  errorHandle(authorization(role.USER_ROLES)),
  errorHandle(noteController.updateNote)
);
router.delete(
  "/delete/:id",
  errorHandle(auth()),
  errorHandle(authorization(role.USER_ROLES)),
  errorHandle(noteController.deleteNote)
);

router.get(
  "/getspecificnote/:id",
  errorHandle(auth()),
  errorHandle(authorization(["user"])),
  errorHandle(noteController.getNoteById)
);
router.get(
  "/getallnotespecificowner",
  errorHandle(auth()),
  errorHandle(noteController.getNotesByUserId)
);

export default router;
