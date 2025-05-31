import { Request, Response, NextFunction } from "express";
import userModel from "../models/user.model";
import { User } from "../models/user.model";
import jwt from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
        res.status(401).json({ error: "Authentication required" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      userId: number;
      username: string;
    };

    console.log(decoded)

    const user = await userModel.findById(decoded.userId);
    if (!user) {
        res.status(401).json({ error: 'User not found' });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(500).json({ error: "Authentication failed" });
  }
};
