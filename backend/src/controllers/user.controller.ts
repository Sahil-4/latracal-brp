import { Request, Response } from "express";
import { APIResponse } from "../utils/APIResponse.js";
import User from "../models/user.model.js";

const getUserProfile = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);

    if (!user) {
      res.status(404).send(new APIResponse(404, null, "user not found"));
      return;
    }

    const data = {
      _id: user._id,
      username: user.username,
    };

    res.status(200).send(new APIResponse(200, data, "user profile fetch successful"));
  } catch (error) {
    console.log(error);
    res.status(500).send(new APIResponse(500, null, "unable to fetch user profile"));
  }
};

const updateUserProfile = async (req: Request, res: Response) => {
  try {
    const reqUserId = req.user_id;

    const { id } = req.params;
    const { username } = req.body;

    if (reqUserId !== id) {
      res.status(409).send(new APIResponse(409, null, "unauthorized user"));
      return;
    }

    await User.findByIdAndUpdate(id, { username });
    const user = await User.findById(id);

    if (!user) {
      res.status(404).send(new APIResponse(404, null, "user not found"));
      return;
    }

    const data = {
      _id: user._id,
      username: user.username,
    };

    res.status(200).send(new APIResponse(200, data, "user profile update successful"));
  } catch (error) {
    res.status(500).send(new APIResponse(500, null, "unable to update user profile"));
  }
};

export { getUserProfile, updateUserProfile };
