import { Request, Response, NextFunction } from "express";
import recentViews from "../utils/recentViews";

export const recordRecentView = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.user?.id; // From auth middleware
  const articleId = parseInt(req.params.id);

  if (userId && articleId) {
    recentViews.addView(userId, articleId);
  }

  next();
};
