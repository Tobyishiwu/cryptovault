import { Request, Response } from "express";
import bcrypt from "bcryptjs";

import User from "../models/User";
import { generateToken } from "../utils/generateToken";
import { createUserWallets } from "../services/wallet.service";

export const register = async (
  req: Request,
  res: Response
) => {
  try {
    const {
      fullName,
      email,
      password,
    } = req.body;

    const existingUser =
      await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashedPassword =
      await bcrypt.hash(password, 10);

    const user = await User.create({
      fullName,
      email,
      password: hashedPassword,
    });

    await createUserWallets(
      user._id.toString()
    );

    const token = generateToken(
      user._id.toString()
    );

    return res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Registration failed",
    });
  }
};

export const login = async (
  req: Request,
  res: Response
) => {
  try {
    const {
      email,
      password,
    } = req.body;

    const user =
      await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    const validPassword =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!validPassword) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    const token = generateToken(
      user._id.toString()
    );

    return res.json({
      success: true,
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Login failed",
    });
  }
};

export const getCurrentUser = async (
  req: any,
  res: Response
) => {
  try {
    const user =
      await User.findById(
        req.userId
      ).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.json({
      id: user._id,
      fullName: user.fullName,
      email: user.email,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message:
        "Failed to fetch user",
    });
  }
};