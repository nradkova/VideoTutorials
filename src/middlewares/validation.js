const { body, validationResult } = require('express-validator');

function userValidation() {
    return async (req, res, next) => {
        //await body('email').trim().isEmail().withMessage('Email is invalid!').toLowerCase().run(req);
        await body('username').trim().isLength({ min: 5 }).withMessage('Username should be at least 5 characters!')
            .isAlphanumeric().withMessage('Username should consist only English letters and digits!').toLowerCase().run(req);

        await body('password').trim().isLength({ min: 5 }).withMessage('Password should be at least 5 characters!')
            .isAlphanumeric().withMessage('Password should consist only English letters and digits!').run(req);

        if (req.body.repass || req.body.repass == '') {
            await body('repass').trim().custom((value, { req }) => {
                if (value !== req.body.password) {
                    throw 'Passwords do not match!';
                }
                return true;
            }).run(req);
        }

        const errors = validationResult(req).errors;
        if (errors.length > 0) {
            req.userErrors = {
                name: 'inputError',
                message: errors.map(x => x.msg)
            }
        }
        next();
    };
};

function courseValidation() {
    return async (req, res, next) => {
        await body('title').trim().isLength({ min: 4 }).withMessage('Title should be at least 4 characters!').run(req);
        await body('description').isLength({ min: 20 }).withMessage('Description should be up 20 characters!').run(req);
        await body('imageUrl').isURL().withMessage('Course image url is invalid!').run(req);
        await body('isPublic').toBoolean().run(req);

        const errors = validationResult(req).errors;
        if (errors.length > 0) {
            req.courseErrors = {
                name: 'inputError',
                message: errors.map(x => x.msg)
            }
        }
        next();
    };
};


module.exports = {
    userValidation,
    courseValidation
}