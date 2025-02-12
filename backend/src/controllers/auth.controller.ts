import { Request, Response } from "express";
import { APIResponse } from "../utils/APIResponse.js";
import User from "../models/user.model.js";

const signup = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    if (!username.trim()) {
      res.status(400).send(new APIResponse(400, null, "username is required"));
      return;
    }
    if (!password.trim()) {
      res.status(400).send(new APIResponse(400, null, "password is required"));
      return;
    }

    const existingUser = await User.findOne({ username });

    if (existingUser) {
      res.status(409).send(new APIResponse(409, null, "user already exists"));
      return;
    }

    const user = await User.create({
      username,
      password,
    });

    const token = user.generateToken();

    const data = {
      _id: user._id,
      username: user.username,
      token,
    };

    res.status(200).send(new APIResponse(200, data, "signup successful"));
  } catch (error) {
    res.status(500).send(new APIResponse(500, null, "unable to signup"));
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    if (!username.trim()) {
      res.status(400).send(new APIResponse(400, null, "username is required"));
      return;
    }
    if (!password.trim()) {
      res.status(400).send(new APIResponse(400, null, "password is required"));
      return;
    }

    const user = await User.findOne({ username });

    if (!user) {
      res.status(404).send(new APIResponse(404, null, "user does not exists"));
      return;
    }

    const isPasswordValid = await user.verifyPassword(password);

    if (!isPasswordValid) {
      res.status(401).send(new APIResponse(401, null, "invalid credentials"));
      return;
    }

    const token = user.generateToken();

    const data = {
      _id: user._id,
      username: user.username,
      token,
    };

    res.status(200).send(new APIResponse(200, data, "login successful"));
  } catch (error) {
    res.status(500).send(new APIResponse(500, null, "unable to login"));
  }
};

export { signup, login };
