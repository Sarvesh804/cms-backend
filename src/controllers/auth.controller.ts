import { Request, Response } from 'express';
import userModel from '../models/user.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


// POST /register
const register = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!username || !password) {
        res.status(400).json({ error: 'Username and password are required' });
  }

  try {

    const existingUser = await userModel.findByUsername(username);
    if (existingUser) {
        res.status(409).json({ error: 'Username already exists' });
    }

    const newUser = await userModel.register(username, password);
    res.status(201).json({ data: newUser });
  } catch (error) {
    res.status(500).json({ error: 'Failed to register user' });
  }
};



// POST /login
const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!username || !password) {
        res.status(400).json({ error: 'Username and password are required' });
  }

  try {
    const user = await userModel.findByUsername(username);

    if (!user || !(await bcrypt.compare(password, user.password))) {
        res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
        { userId: user.id, username: user.username },
        process.env.JWT_SECRET!,
        { expiresIn: '1h' }
      );

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
};

export default {
  register,
  login,
};