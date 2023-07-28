const jwt = require("jsonwebtoken");

function signJWT(payload) {
    return jwt.sign(payload, process.env.JWT_SECRET);
}

function authenticateJWT(req, res, next) {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
            if (err) {
                return res.sendStatus(403);
            }

            // Attach the payload to the request object
            req.payload = payload;
            next();
        });
    } else {
        res.sendStatus(401);
    }
}

module.exports = {signJWT, authenticateJWT};