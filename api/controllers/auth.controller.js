import Role from "../models/Role.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { CreateSuccess } from "../utils/success.js";
import { CreateError } from "../utils/error.js";
export const register = async (req, res, next) => {
  try {
    const role = await Role.find({ role: "user" });
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      username: req.body.username,
      email: req.body.email,
      password: hashPassword,
      roles: role,
    });
    await newUser.save();
    return next(CreateSuccess(200, "User Registered Successfully!"));
  } catch (error) {
    return next(CreateError(500, "Internal Serevr Error!"));
  }
};

export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    return res.status(200).send(users);
  } catch (error) {
    return next(CreateError(500, "Internal Serevr Error!"));
  }
};

export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return next(CreateError(404, "User not found!"));

    }
    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect) {
      return next(CreateError(400, "Password is incorrect!"));
    }
    return next(CreateSuccess(200, "Login Success!"));
  } catch (error) {
    return next(CreateError(500, "Something went wrong!"));
  }
};
