const jwt = require('jsonwebtoken');
require('dotenv').config();

function  auth(req, res, next) {
    const token = req.header('Authorization');
    if (!token) {
        return res.status(401).json({ msg: 'Not authorized' });
    }
    try {
        const decodedToken = jwt.verify(token, process.env.jwtSecret);
        req.user = decodedToken;
        next(); 
    } catch (err) {
        res.status(400).json({ msg: 'Token is not valid' })
    }
}

module.exports = auth;