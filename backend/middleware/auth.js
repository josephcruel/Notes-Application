const jwt = require('jsonwebtoken')
require('dotenv').config();

// Middleware function to authenticate requests
module.exports = function(req, res, next) {
    const token = req.header('x-auth-token')

    // If there is no token
    if(!token) {
        return res.status(401).json({ msg: 'No token, authrization denied!'})
    }

    // Try to verify the token
    try {
        // Verify the token using the secret key from environment variables
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded.user
        next()
    } catch(err) {
        // Token is not vaild
        res.status(401).json({ msg: ' Token is not valid!'})
    }
}