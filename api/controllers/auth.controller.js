import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";
export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });
  try {
    await newUser.save();
    res.status(201).json({
      message: "User created succesfully!!",
    });
  } catch (err) {
    next(err);
  }
};

export const signin = async (req, res, next) => {
  const {email,password} = req.body
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorHandler(404, "User not found!"));
    const isValidPassword = bcryptjs.compareSync(password, validUser?.password);
    if (!isValidPassword) return next(errorHandler(401, "Wrong credentials"));
    const { password: hashedPassword, ...user } = validUser._doc;
    const token = jwt.sign({ id: validUser?._id }, process.env.SECRET_KEY);
    return res
      .cookie("access_token", token, { httpOnly: true, expiresIn: "1h" })
      .status(201)
      .json(user);
  } catch (err) {
    next(err);
  }
};
