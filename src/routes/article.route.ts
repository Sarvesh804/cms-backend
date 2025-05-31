import express from 'express';
import {getAllArticles, getArticleById, createArticle, updateArticle, deleteArticle, getRecentlyViewed} from '../controllers/article.controller';
import { authenticate } from '../middleware/auth.middleware';
import { recordRecentView } from '../middleware/recentView.middleware';

const articleRoute = express.Router();

articleRoute.get('/articles', authenticate, getAllArticles);
articleRoute.get('/articles/:id', authenticate,recordRecentView, getArticleById);
articleRoute.post('/articles', authenticate, createArticle);
articleRoute.put('/articles/:id', authenticate, updateArticle);
articleRoute.delete('/articles/:id', authenticate, deleteArticle);
articleRoute.get('/recently-viwed',authenticate, getRecentlyViewed)

export default articleRoute;