import { body } from "express-validator";
import { validateErrors } from "../helpers/validate.errors.js";

export const createCommentaryValidator = [
    body('publication', 'Publication is required')
        .notEmpty()
        .isMongoId()
        .withMessage('Invalid publication ID'),
    body('content', 'Content cannot be empty')
        .notEmpty()
        .isString()
        .withMessage('Content must be a string'),
    validateErrors
];

export const editCommentaryValidator = [
    body('author', 'Invalid author ID')
        .optional()
        .if(body('author').notEmpty())
        .isMongoId()
        .withMessage('Author must be a valid ID'),
    body('publication', 'Invalid publication ID')
        .optional()
        .if(body('publication').notEmpty())
        .isMongoId()
        .withMessage('Publication must be a valid ID'),
    body('content', 'Invalid content')
        .optional()
        .if(body('content').notEmpty())
        .isString()
        .withMessage('Content must be a string'),
    validateErrors
];
