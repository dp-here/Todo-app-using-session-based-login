const express = require('express');
const authController = require('../controller/authController');
const { body } = require('express-validator');

const router = express.Router();
const db = require('../util/database');

router.post(
    '/signup',
    [
        body('name').trim().not().isEmpty(),
        body('email').isEmail().withMessage('Please enter a valid email!')
            .custom(async (email) => {
                const [rows, fields] = await db.execute('SELECT * FROM users WHERE email=?', [email]);
                if (rows.length > 0) {
                    throw new Error('Email address already exists!');
                }
            }).normalizeEmail(),
        body('password').trim().isLength({ min: 7 })
    ],
    authController.signup
);


router.post('/login', authController.login);  
router.post('/clear-session', authController.clearSession);  


module.exports = router;
