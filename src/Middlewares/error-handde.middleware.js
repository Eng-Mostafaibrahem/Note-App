import { ErrorHandleClass } from "../utils/error-class.utils.js";

export const errorHandle = (API) => {
  return async (req, res, next) => {
    try {
      await API(req, res, next);
    } catch (err) {
      console.log("error in error handle", err.message);
      next(err);
    }
  };
};

export const globalResponse = (err, req, res, next) => {
  if (err) {
    res.status(err["statusCode"] || 400).json({
      message: err.message,
      stack: err.stack,
      errorPositon: err.errorPositon,
      data: err.data,
    });
  }
};
