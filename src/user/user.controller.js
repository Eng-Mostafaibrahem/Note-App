import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import UserModel from "../../DB/models/user.model.js";
import { ErrorHandleClass } from "../utils/error-class.utils.js";
import { cloudinaryConfig } from "../utils/cloudinary.js";
// import { sendEmailService } from "../Services/send-email.services.js";
export const signUp = async (req, res, next) => {
  const { name, email, password, age, gender, role } = req.body;
  // check if email in database
  const isEmailExit = await UserModel.findOne({ email });
  if (isEmailExit) return next(new ErrorHandleClass("User already exsit", 400));
  //hashed password
  const cipher = bcrypt.hashSync(password, 10);
  //new user data
  const userObject = new UserModel({
    name,
    email,
    password: cipher,
    age,
    gender,
    role,
  });

  // const verify = sendEmailService({
  //   to:email,
  //   subject: "Email Verification",
  //   text: "test verify",
  // })

  //create
  const user = await UserModel.create(userObject);

  //response
  return res.status(200).json({ message: "SignUp Successfully" });
};

export const signIn = async (req, res, next) => {
  const { email, password } = req.body;
  // find user
  const user = await UserModel.findOne({ email });
  if (!user)
    return next(new ErrorHandleClass("Invalid Login Credentials", 400));
  //compare pass
  const isPasswordMatch = bcrypt.compareSync(password, user.password);
  if (!isPasswordMatch)
    return next(new ErrorHandleClass("Invalid Login Credentials", 400));

  //generate token
  const token = jwt.sign(
    {
      userId: user._id,
      email: user.email,
    },
    "accessTokenSignature",
    { expiresIn: "1h" }
  );
  res.status(200).json({ message: "Login Successful", token });
  next();
};

export const testUpload = async (req, res) => {
  // ping to check server
  // const data = await cloudinaryConfig().api.ping()

  //upload remote image
  // const data = await cloudinaryConfig().uploader.upload(
  //     `https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg`,
  //     {
  //         folder:"test/remote"
  //       }
  //     );
  //     res.json({data})

  // upload local file

  const data = await cloudinaryConfig().uploader.upload(req.file.path, {
    folder: "test/Cvs",
    use_filename: true,
    tags: ["uploaded"],
    resource_type: "raw",
    // resource_type: "video" to upload video
  });
  res.json({ data });
};
