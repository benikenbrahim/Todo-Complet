const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

ACCESS_TOKEN_SECRET=process.env.ACCESS_TOKEN_SECRET;
REFRESH_TOKEN_SECRET=process.env.REFRESH_TOKEN_SECRET;

function verfyjwt(req, res, next) {

    console.log("req:",req);

    const accessToken = req.cookies.accessToken;
    if (!accessToken) {
        return res.status(401).json({ message: 'Access Token not found' });
    }
    try {
        const decoded = jwt.verify(accessToken,ACCESS_TOKEN_SECRET);
        req.user = decoded; 
        next();
    } catch (err) {
        return res.status(403).json({ message: 'Invalid Access Token' });
    }
}

module.exports = verfyjwt;