const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const db = require('../util/database');
const validator = require('email-validator');
const redisClient = require('../util/redis');
const authMiddleware=require('../middleware/auth');
const session = require('express-session');

exports.signup = async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    try {
        const hashedPassword = await bcrypt.hash(password, 12);

        const [result, fields] = await db.execute(
            'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
            [name, email, hashedPassword]
        );

        res.status(201).json({ message: "User registered successfully!" });
    } catch (error) {
        if (!res.statusCode) {
            res.statusCode = 500;
        }
        next(error);
    }
};

exports.login =async (req, res, next) => {
    const user = req.body;
    const isValid = validator.validate(user.email);
    if (!isValid) {
        return res.status(422).send("Not a valid email address");
    }

    try {
        const [results] = await db.execute(
            "SELECT * FROM users WHERE email=?",
            [user.email]
        );

        if (results.length === 0) {
            return res.status(401).json({ msg: "Email or password do not exist." });
        }

        const match = await bcrypt.compare(user.password, results[0].password);
        if (!match) {
            return res.status(401).json({ msg: "Invalid credentials." });
        }

        const userData = {
            name: results[0].name,
            email: results[0].email
        };
   
        redisClient.set(req.sessionID, userData.email, "EX", 3600);

        res.cookie("sessionID", req.sessionID, {
            maxAge: 24 * 60 * 60 * 1000,
            httpOnly: false
        });

        res.json({
            message:"Logged in.",
            // sessionID: req.sessionID,  
            expires: {
                maxAge: 24 * 60 * 60 * 1000,
                httpOnly: false               
            }
        });
    } catch (error) {
        console.error("Error logging in:", error);
        res.status(500).send("Internal Server Error");
    }
}

exports.clearSession = async (req,res,next)=>{
    redisClient.del(req.sessionID);
    res.send({status: true})
    
  }                             