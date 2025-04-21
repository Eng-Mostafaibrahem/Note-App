import { Router } from "express";
import * as userController from "./user.controller.js";
import { auth } from "../Middlewares/auth.middleware.js";
import { errorHandle } from "../Middlewares/error-handde.middleware.js";
import { multerCloudinary } from "../Middlewares/multer.middleware.js";
import { extensions } from "../utils/file-extension.utils.js"


const router = Router();

router.post("/signup", userController.signUp);
router.post("/login", userController.signIn);
router.get("/", multerCloudinary({allowedExtensions:extensions.Files}).single("cv"),
 errorHandle(userController.testUpload));

export default router;
