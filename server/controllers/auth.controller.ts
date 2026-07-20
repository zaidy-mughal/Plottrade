import { Request, Response, NextFunction } from "express";
import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { errorHandler } from "../utils/errorHandler.js";

export const signup = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { username, email, password, role } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashedPassword, role });
  try {
    await newUser.save();
    res.status(201).json("User created successfully!");
  } catch (error) {
    next(error);
  }
};

export const signin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { email, password, role } = req.body;
  try {
    const validUser = await User.findOne({ email, role });
    if (!validUser) return next(errorHandler(404, "User not found!"));

    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, "Wrong credentials!"));

    if (!process.env.JWT_SECRET) {
      return next(errorHandler(500, "JWT_SECRET is not defined"));
    }

    const token = jwt.sign({ id: validUser._id, role: validUser.role }, process.env.JWT_SECRET, { expiresIn: "1d" });
    const { password: pass, ...rest } = validUser.toObject();
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};

export const google = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (!process.env.JWT_SECRET) {
      return next(errorHandler(500, "JWT_SECRET is not defined"));
    }

    const user = await User.findOne({ email: req.body.email, role: req.body.role });
    if (user) {
      const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1d" });
      const { password: pass, ...rest } = user.toObject();
      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(rest);
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      const newUser = new User({
        username:
          req.body.name.split(" ").join("").toLowerCase() +
          Math.random().toString(36).slice(-4),
        email: req.body.email,
        password: hashedPassword,
        avatar: req.body.photo,
        role: req.body.role,
      });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id, role: newUser.role }, process.env.JWT_SECRET, { expiresIn: "1d" });
      const { password: pass, ...rest } = newUser.toObject();
      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};

export const signOut = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    res.clearCookie("access_token");
    res.status(200).json("User has been logged out!");
  } catch (error) {
    next(error);
  }
};

