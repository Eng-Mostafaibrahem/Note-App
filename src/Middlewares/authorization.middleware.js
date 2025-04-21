import { ErrorHandleClass } from "../utils/error-class.utils.js";
export const authorization = (allowedRoles) => {
  return (req, res, next) => {
    const user = req.authUser;
    
    if (!allowedRoles.includes(user.role)) {
      return next(new ErrorHandleClass("not authontcated", 401, "authoriztion"));
    }
    next();
  };
};
