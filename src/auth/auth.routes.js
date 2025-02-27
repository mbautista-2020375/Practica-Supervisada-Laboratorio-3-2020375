'use strict';

import { Router } from 'express';
import { registerClient, registerAdmin, login } from './auth.controller.js'; // Ajusta la ruta si es necesario

const api = Router();

api.post('/register/client', registerClient);
api.post('/register/admin', registerAdmin);
api.post('/login', login);

export default api;
