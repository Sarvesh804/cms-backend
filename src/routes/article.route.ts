import express from 'express';
import {getAllArticles, getArticleById, createArticle, updateArticle, deleteArticle} from '../controllers/article.controller';


const articleRoute = express.Router();

articleRoute.get('/articles', getAllArticles);
articleRoute.get('/articles/:id', getArticleById);
articleRoute.post('/articles', createArticle);
articleRoute.put('/articles/:id', updateArticle);
articleRoute.delete('/articles/:id', deleteArticle);

export default articleRoute;