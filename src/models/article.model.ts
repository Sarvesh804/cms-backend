import db from "../config/db";

export interface Article {
  id: number;
  title: string;
  content: string;
  created_at?: Date;
  updated_at?: Date;
}

const getAllByUser = async (userId: number): Promise<Article[]> => {
  return await db.any("SELECT * FROM articles WHERE user_id = $1", [userId]);
};

const getById = async (id: number): Promise<Article> => {
  return await db.one("SELECT * FROM articles WHERE id = $1", [id]);
};

const create = async (
  userId: number,
  title: string,
  content: string
): Promise<Article> => {
  return await db.one(
    "INSERT INTO articles(title, content, user_id) VALUES($1, $2, $3) RETURNING *",
    [title, content, userId]
  );
};

const update = async (
  id: number,
  title: string,
  content: string
): Promise<Article> => {
  return await db.one(
    "UPDATE articles SET title = $1, content = $2, updated_at = NOW() WHERE id = $3 RETURNING *",
    [title, content, id]
  );
};

const remove = async (id: number): Promise<void> => {
  await db.none("DELETE FROM articles WHERE id = $1", [id]);
};

const getTotalCountByUser = async (userId: number): Promise<number> => {
  const result = await db.one(
    "SELECT COUNT(*) FROM articles WHERE user_id = $1",
    [userId]
  );
  return parseInt(result.count);
};

const getPaginatedByUser = async (
  userId: number,
  page: number,
  limit: number
): Promise<Article[]> => {
  const offset = (page - 1) * limit;
  return await db.any(
    "SELECT * FROM articles WHERE user_id = $1 ORDER BY id ASC LIMIT $2 OFFSET $3",
    [userId, limit, offset]
  );
};

export default {
  getAllByUser,
  getById,
  create,
  update,
  remove,
  getTotalCountByUser,
  getPaginatedByUser,
};
