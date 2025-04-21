import jwt from "jsonwebtoken";
import UserModel from "../../DB/models/user.model.js";
import { ErrorHandleClass } from "../utils/error-class.utils.js";
/*destruct token 
 check token found
 add layer security (barer token)

*/

export const auth = () => {
  return async (req, res, next) => {
    const { token } = req.headers;
    if (!token) {
      return next(
        new ErrorHandleClass(
          "Please Sign In First ",
          401,
          "authentcation error"
        )
      );
    }

    // if (!token.startWith("secretLayer"))
    //   return next( new ErrorHandleClass("Invaild Token",401,"authentcation error"))
    // const originalToken = token.split(" ")[1];
    //decode
    const decodData = jwt.verify(token, process.env.LOGIN_SECRET);
    if (!decodData?.userId)
      return next(
        new ErrorHandleClass("Invalid Payload", 401, "authentcation error")
      );

    // get user id

    const user = await UserModel.findById(decodData.userId).select("-password");
    if (!user)
      return next(
        new ErrorHandleClass(
          "Invalid Payload",
          401,
          "please signup and try to login again"
        )
      );

    //send data in req to other middleware don't send critical data
    req.authUser = user;

    next();
  };
};
