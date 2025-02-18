import jwt from "jsonwebtoken";
import { ErrorHandler } from "../utils/errorHandler.js";
import UserModel from "../src/user/models/user.schema.js";

export const auth = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new ErrorHandler(401, "Login to access this route!"));
  }

  try {
    const decodedData = jwt.verify(token, process.env.JWT_Secret);
    req.user = await UserModel.findById(decodedData.id);
    next();
  } catch (error) {
    return next(new ErrorHandler(401, "Invalid or expired token"));
  }
};

export const authByUserRole = (role) => {
  return async (req, res, next) => {
    if (req.user.role != role) {
      return next(
        new ErrorHandler(
          403,
          `Role: ${req.user.role} is not allowed to access this resource`
        )
      );
    }
    next();
  };
};
