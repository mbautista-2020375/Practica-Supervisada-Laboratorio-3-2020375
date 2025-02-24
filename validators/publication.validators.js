import { body } from "express-validator";
import { validateErrors } from "../helpers/validate.errors.js";

export const createPublicationValidator = [
    body('title', 'Title cannot be empty')
        .notEmpty()
        .isString()
        .withMessage('Title must be a string'),
    body('category', 'Category is required')
        .notEmpty()
        .isMongoId()
        .withMessage('Invalid category ID'),
    body('content', 'Content cannot be empty')
        .notEmpty()
        .isString()
        .withMessage('Content must be a string'),
    validateErrors
];

export const editPublicationValidator = [
    body('author', 'Invalid author ID')
        .optional()
        .if(body('author').notEmpty())
        .isMongoId()
        .withMessage('Author must be a valid ID'),
    body('title', 'Invalid title')
        .optional()
        .if(body('title').notEmpty())
        .isString()
        .withMessage('Title must be a string'),
    body('category', 'Invalid category ID')
        .optional()
        .if(body('category').notEmpty())
        .isMongoId()
        .withMessage('Category must be a valid ID'),
    body('content', 'Invalid content')
        .optional()
        .if(body('content').notEmpty())
        .isString()
        .withMessage('Content must be a string'),
    validateErrors
];