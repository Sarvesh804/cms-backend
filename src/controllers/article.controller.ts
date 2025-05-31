import { NextFunction, Request, Response } from "express";
import articleModel from "../models/article.model";
import recentViews from "../utils/recentViews";

// GET all articles (GET /api/articles)
export const getAllArticles = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const userId = req.user?.id;

  try {
    const [totle, data] = await Promise.all([
        articleModel.getTotalCountByUser(userId),
        articleModel.getPaginatedByUser(userId, page, limit),
    ]);
    res.status(200).json({ data, totle, page, limit });
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch articles",
    });
  }
};

// GET article by ID (GET /api/articles/:id)
export const getArticleById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const articleId = parseInt(req.params.id);
  const userId = req.user?.id;
  if (isNaN(articleId)) {
    res.status(400).json({
      error: "Invalid article ID",
    });
  }

  try {
    const article = await articleModel.getById(articleId, userId);
    if (!article) {
      res.status(404).json({
        error: "Article not found",
      });
    }
    res.status(200).json({ data: article });
    next();
  } catch (error) {
    res.status(500).json({
      error: `Failed to fetch article with id: ${articleId}`,
    });
  }
};

// POST create new article (POST /api/articles)
export const createArticle = async (req: Request, res: Response) => {
  const { title, content } = req.body;
  const userId = req.user?.id;

  if (!title || !content) {
    res.status(400).json({
      error: "Title and content are required",
    });
  }
  try {
    const newArticle = await articleModel.create(userId, title, content);
    res.status(201).json({ data: newArticle });
  } catch (error) {
    res.status(500).json({
      error: "Failed to create article",
    });
  }
};

// PUT update article (PUT /api/articles/:id)
export const updateArticle = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const { title, content } = req.body;

  if (isNaN(id)) {
    res.status(400).json({
      error: "Invalid article ID",
    });
  }

  if (!title || !content) {
    res.status(400).json({
      error: "Title and content are required",
    });
  }

  try {
    const updated = await articleModel.update(id, title, content);
    res.status(200).json({ data: updated });
  } catch (error) {
    res.status(404).json({ error: "Article not found" });
  }
};

// DELETE remove article (DELETE /api/articles/:id)
export const deleteArticle = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);

  try {
    await articleModel.remove(id);
    res.status(204).send();
  } catch (error) {
    res.status(404).json({ error: "Article not found" });
  }
};

export const getRecentlyViewed = (req: Request, res: Response) => {
  const userId = req.user?.id;

  if (!userId) {
    res.status(401).json({ error: "User not found" });
  }

  const recentIds = recentViews.getRecent(userId);

  res.status(200).json({
    data: recentIds,
  });
};
