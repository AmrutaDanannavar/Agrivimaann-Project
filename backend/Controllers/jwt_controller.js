const jwt = require('jsonwebtoken');
const JWT_SECRET = 'MY_SECRET_FOR_FSD_PROJECT'; 

const jwt_verify = function (req, res, next) {
    const authHeader = req.headers['authorization']; // Retrieve the token from the header
    const token = authHeader && authHeader.split(' ')[1]; // Extract token

    if (!token) {
        return res.status(401).json({ message: "Token is missing. Please provide a valid token." });
    }

    jwt.verify(token, JWT_SECRET, function (err, jwt_decoded) {
        if (err) {
            if (err.name === "TokenExpiredError") {
                return res.status(401).json({ message: "Token is expired." });
            } else {
                return res.status(401).json({ message: "Token is invalid." });
            }
        } else {
            res.locals = jwt_decoded;
            next();
        }
    });
};

module.exports = jwt_verify;
