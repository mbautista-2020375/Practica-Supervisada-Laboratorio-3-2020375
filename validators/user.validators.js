import { body } from "express-validator" //Capturar todo el body de la solicitud
import { validateErrors} from "../helpers/validate.errors.js"
import { existUsername, validateOldPassword } from "./custom.validators.js"

export const registerValidator = [
    body('name', 'Name cannot be empty')
        .notEmpty(),
    body('lastname', 'Last Name cannot be empty')
        .notEmpty(),
    body('email', 'Email cannot be empty or is not a valid email')
        .notEmpty()
        .isEmail()
        .withMessage('Provided email is not an email.'),
    body('username', 'Username cannot be empty')
        .notEmpty()
        .toLowerCase()
        .custom(existUsername),
    body('password', 'Password cannot be empty')
        .notEmpty()
        .isStrongPassword()
        .withMessage('The password must be strong')
        .isLength({min: 8})
        .withMessage('Password must be 8 characters at least.'),
    body('phone', 'Phone cannot be empty.')
        .notEmpty()
        .isMobilePhone()
        .withMessage('Provided phone is not a valid phone'),
    body('age', 'Age cannot be empty')
        .notEmpty(),
    validateErrors
]

export const editProfileValidator = [
    body('name', 'Invalid name')
        .optional(),
    body('lastname', 'Invalid last name')
        .optional(),
    body('email', 'Invalid email')
        .optional()
        .if(body('email').notEmpty())
        .isEmail()
        .withMessage('Provided email is not an email.'),
    body('username', 'Invalid username')
        .optional()
        .toLowerCase()
        .if(body('username').notEmpty()) 
        .custom(existUsername),
    body('password', 'Invalid password')
        .optional()
        .if(body('password').notEmpty())
        .custom(async (password, { req }) => {
            await validateOldPassword(req.body.oldpassword, req.user.uid);
        })
        .isStrongPassword()
        .withMessage('The password must be strong')
        .isLength({ min: 8 })
        .withMessage('Password must be 8 characters at least.'),
    
    body('phone', 'Invalid phone')
        .optional()
        .if(body('phone').notEmpty())
        .isMobilePhone()
        .withMessage('Provided phone is not a valid phone'),
    body('age', 'Invalid age')
        .optional(),

    validateErrors
];

export const loginValidator = [
    body('userLogin', 'Param provided for login cannot be empty')
        .notEmpty()
        .toLowerCase(),
    body('password', 'Password cannot be empty')
        .notEmpty()
        .isStrongPassword()
        .withMessage('The password must be strong')
        .isLength({min: 8}),
        validateErrors
]