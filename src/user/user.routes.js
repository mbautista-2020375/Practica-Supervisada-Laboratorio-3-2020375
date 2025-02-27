'use strict';

import { Router } from 'express';
import {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
    login
    
} from './user.controller.js';
import { validateJwt } from '../../middlewares/validate.jwt.js';
import { editProfileValidator, loginValidator, registerValidator } from '../../validators/user.validators.js';

const api = Router();

// No necesita token
api.post('/register/', registerValidator, createUser);
api.post('/login/', loginValidator, login)
// Necesita token
api.get('/users/',[validateJwt], getAllUsers);
api.get('/user/:id',[validateJwt], getUserById);
api.put('/editprofile/',[validateJwt, editProfileValidator], updateUser);
api.put('/deactivateaccount/', [validateJwt] ,deleteUser);

export default api;
