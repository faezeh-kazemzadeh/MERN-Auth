import jwt from "jsonwebtoken";
import { errorHandler } from "../utils/error.js";

const generateToken = (res, user) => {
  const token = jwt.sign(user, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  res.cookie("access_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development", // Use secure cookies in production
    sameSite: "strict", // Prevent CSRF attacks
    maxAge: 24 * 60 * 60 * 1000, // 1 day
  });
};

const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) return next(errorHandler(401, " Unauthorized"));
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return next(errorHandler(403, "forbidden"));
    req.user = user;
    next();
  });
};

const authorize = (requiredRoles) => (req, res, next) => {
  if (req.user.roles.filter((role) => requiredRoles.includes(role)).length) {
    next();
  } else {
    return next(errorHandler(401, "UnAuthorized"));
  }
};

export { generateToken, verifyToken, authorize };
