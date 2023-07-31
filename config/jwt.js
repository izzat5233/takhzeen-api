const jwt = require("jsonwebtoken");

/**
 * Converts the payload to a JWT and returns it.
 */
function signJWT(payload) {
    return jwt.sign(payload, process.env.JWT_SECRET);
}

/**
 * Verifies that request contains a valid JWT token in the authorization header.
 * Then attach the payload of the token to the request body to be used by other middlewares.
 */
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