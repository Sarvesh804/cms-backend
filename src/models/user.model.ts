import db from "../config/db";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";

export interface User {
  id: number;
  username: string;
  password: string;
  created_at?: Date;
}

const SALT_ROUNDS = 10;

const register = async (username: string, password: string): Promise<User> => {
  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
  return await db.one(
    "INSERT INTO users(username, password) VALUES($1, $2) RETURNING *",
    [username, hashedPassword]
  );
};

const findByUsername = async (username: string): Promise<User | null> => {
  const user = await db.oneOrNone("SELECT * FROM users WHERE username = $1", [
    username,
  ]);
  return user || null;
};

const findById = async (id: number): Promise<User | null> => {
  const user = await db.oneOrNone("SELECT * FROM users WHERE id = $1", [id]);
  return user || null;
};


export default {
  register,
  findByUsername,
  findById,
};
