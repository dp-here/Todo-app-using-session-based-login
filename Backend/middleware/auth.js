const redisClient=require('../util/redis')

const authMiddleware = (req, res, next) => {
    if (!req.cookies.sessionID) {
        return res.status(401).json({ message: "Session ID cookie missing. Please log in." });

    } else {
        const token = req.cookies.sessionID;
        redisClient.get(token, (err, verify) => {
            if (verify == null) {
                console.log("Unverified");
                res.status(401).json({
                    message: "Please login",
                });
            } else {
                console.log("verified");
                req.user_id = verify;
                next(); 
            }
        });
    }
};

module.exports = authMiddleware;
