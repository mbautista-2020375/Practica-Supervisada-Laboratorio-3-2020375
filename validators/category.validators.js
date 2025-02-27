import { body } from "express-validator";
import { validateErrors } from "./validate.error.js";

export const createCategoryValidator = [
    body('name', 'Category name cannot be empty')
        .notEmpty()
        .isString()
        .withMessage('Category name must be a string'),
    body('description', 'Description cannot be empty')
        .notEmpty()
        .isString()
        .withMessage('Description must be a string'),
    body('status', 'Status must be a boolean value')
        .optional()
        .isBoolean()
        .withMessage('Invalid status value'),
    validateErrors
];

export const editCategoryValidator = [
    body('name', 'Invalid category name')
        .optional()
        .isString()
        .withMessage('Category name must be a string'),
    body('description', 'Invalid description')
        .optional()
        .isString()
        .withMessage('Description must be a string'),
    body('status', 'Invalid status value')
        .optional()
        .isBoolean()
        .withMessage('Status must be a boolean value'),
    validateErrors
];
