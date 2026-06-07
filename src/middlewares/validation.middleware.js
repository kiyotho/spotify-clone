import { body, validationResult} from 'express-validator'


async function validateResult(req, res, next) {

    const errors = validationResult(req)

    if(!errors.isEmpty()) return res.status(400).json({ message:'unsuccessful', error: errors.array().map((element) => element.msg)})
    
    next()
}


export const registerUserValidationRules = [
    body('username')
        .isString()
        .withMessage('Username must be string!')
        .isLength({ min:3, max:20})
        .withMessage('Username should be between 3 to 20 letters'),

    body('email')
        .isEmail()
        .withMessage('Email is not valid'),

    body('password')
        .isString()
        .withMessage('password should be a string')
        .isLength({min:8})
        .withMessage('password should be atleast 8 letters long'),


    validateResult
]