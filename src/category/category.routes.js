'use strict';

import { Router } from 'express';
import { createCategory, getAllCategories, getCategoryById, updateCategory, deleteCategory } from './category.controller.js';
import { validateJwt } from '../../middlewares/validate.jwt.js';

const api = Router();

api.post('/', validateJwt, createCategory);
api.get('/', validateJwt, getAllCategories);
api.get('/:id', validateJwt, getCategoryById);
api.put('/:id', validateJwt, updateCategory);
api.delete('/:id', validateJwt, deleteCategory);

export default api;
