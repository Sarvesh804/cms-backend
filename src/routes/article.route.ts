import express from 'express';
import {getAllArticles, getArticleById, createArticle, updateArticle, deleteArticle} from '../controllers/article.controller';
import { authenticate } from '../middleware/auth.middleware';

const articleRoute = express.Router();

articleRoute.get('/articles', authenticate, getAllArticles);
articleRoute.get('/articles/:id', authenticate, getArticleById);
articleRoute.post('/articles', authenticate, createArticle);
articleRoute.put('/articles/:id', authenticate, updateArticle);
articleRoute.delete('/articles/:id', authenticate, deleteArticle);

export default articleRoute;