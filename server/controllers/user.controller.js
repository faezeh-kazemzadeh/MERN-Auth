import bcrypt from "bcrypt";
import _ from "lodash";
import asyncHandler from "express-async-handler";
import { User, validate } from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import { generateToken } from "../middleware/auth.middleware.js";
//  @Destination    Authenticate User
//  @Route           POST /api/users/signin
//  @Access         Public
const signin = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const validUser = await User.findOne({ email });
  if (validUser) {
    const validPassword = await bcrypt.compare(password, validUser.password);
    if (validPassword) {
      const token = generateToken(res, {
        _id: validUser._id,
        role: validUser.roles,
      });
      const { password: pass, ...rest } = validUser._doc;

      res.status(200).json({ data: rest });
    } else {
      return next(errorHandler(401, "Please provide a valid email address and password."));
    }
  } else {
    return next(errorHandler(401, "Please provide a valid email address and password."));
  }
});

//  @Destination    Register User
//  @Route           POST /api/users/signup
//  @Access         Public
const signup = asyncHandler(async (req, res, next) => {
  const { error } = validate(req.body);
  if (error) return next(errorHandler(400, error.details[0].message));
  let user = await User.findOne({ email: req.body.email });
  if (user) return next(errorHandler(400, "User exist"));
  const salt = await bcrypt.genSalt(10);
  req.body.password = await bcrypt.hash(req.body.password, salt);
  user = new User(
    _.pick(req.body, ["firstname", "lastname", "email", "password", "phone"])
  );
  await user.save();

  generateToken(res, _.pick(user, ["_id", "roles"]));

  res.status(200).json(_.pick(user, ["firstname", "lastname", "email"]));
});

//  @Destination    Logout User
//  @Route           POST /api/users/signout
//  @Access         Public
const signout = asyncHandler(async (req, res) => {
  res.clearCookie("access_token");
  res.status(200).json({ message: "sign Out successfully" });
});

//  @Destination    Get User Pofile
//  @Route           POST /api/users/profile
//  @Access         Public
const getUserProfile = asyncHandler(async (req, res,next) => {
  
  const user = await User.findById(req.user._id).select("-password")
  if(!user) return next(errorHandler(404, "User not found"))
  res.status(200).json(user);
});

//  @Destination    Update User Profile
//  @Route           POST /api/users/profile
//  @Access         Public
const updateUserProfile = asyncHandler(async (req, res,next) => {

  const {error} =validate(req.body);
  if (error) return next(errorHandler(400, error.details[0].message));
  let updateFields = { ...req.body };  
  if(req.body.password){
    const salt = await bcrypt.genSalt(10);
    updateFields.password = await bcrypt.hash(req.body.password, salt);
  }
  const updatedUser = await User.findByIdAndUpdate(req.user._id,updateFields, {
    new: true,
    });
    const { password, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
});

export { signup, signin, signout, getUserProfile, updateUserProfile };
