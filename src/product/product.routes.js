'use strict';

import { Router } from 'express';
import { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct } from './product.controller.js';
import { validateJwt } from '../../middlewares/validate.jwt.js'; // Ajusta la ruta si es necesario

const api = Router();

api.post('/', validateJwt, createProduct); 
api.get('/', validateJwt, getAllProducts); 
api.get('/:id', validateJwt, getProductById); 
api.put('/:id', validateJwt, updateProduct); 
api.delete('/:id', validateJwt, deleteProduct); 

export default api;
