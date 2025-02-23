import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });
  try {
    const newDoc = await newUser.save();
    const { password, ...user } = newDoc._doc;
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
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

export const googlesignin = async (req, res, next) => {
  const {username, email,profilePicture } = req.body; 
  try {
    const user = await User.findOne({ email });
    console.log({user})
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY);
      const { password, ...rest } = user._doc;
      res
        .cookie("access_token", token, { httpOnly: true, expiresIn: "1h" })
        .status(201)
        .json(rest);
    } 
    else {
      const generatedPassword = Math.random().toString(36).slice(-8)
      const hashedPassword = bcryptjs.hashSync(generatedPassword,10)
      const geneartedUsername = username.split(' ').join('').toLowerCase() + Math.floor(Math.random() * 10000).toString()
      const newuser = new User({email,profilePicture,password:hashedPassword,username:geneartedUsername,})
      await newuser.save()
      const token = jwt.sign({ id: newuser._id }, process.env.SECRET_KEY);
      const { password, ...rest } = newuser._doc;
      res
        .cookie("access_token", token, { httpOnly: true, expiresIn: "1h" })
        .status(201)
        .json(rest);
    }
  } catch (err) {
    next(err);
  }
};

export const signout = (req,res,next) => {
  try{
    res.clearCookie('access_token').status(200).json("Sign out sucessful")
  }
  catch(err){
    next(err)
  }
}
