import db from "../config/db";

export interface Article {
  id: number;
  title: string;
  content: string;
  created_at?: Date;
  updated_at?: Date;
}

const getAll = async (): Promise<Article[]> => {
  return await db.any("SELECT * FROM articles");
};

const getById = async (id: number): Promise<Article> => {
  return await db.one("SELECT * FROM articles WHERE id = $1", [id]);
};

const create = async (title: string, content: string): Promise<Article> => {
  return await db.one(
    "INSERT INTO articles (title, content) VALUES ($1, $2) RETURNING *",
    [title, content]
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

const getTotalCount = async (): Promise<number> => {
  const result = await db.one("SELECT COUNT(*) FROM articles");
  return parseInt(result.count);
};

const getPaginated = async (
  page: number,
  limit: number
): Promise<Article[]> => {
  const offset = (page - 1) * limit;
  return await db.any(
    "SELECT * FROM articles ORDER BY id ASC LIMIT $1 OFFSET $2",
    [limit, offset]
  );
};

export default {
  getAll,
  getById,
  create,
  update,
  remove,
  getTotalCount,
  getPaginated,
};
