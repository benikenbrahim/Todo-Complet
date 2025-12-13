const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

function verfyjwt(req, res, next) {
    const accessToken = req.cookies.accessToken;
    console.log("L'access token est:", accessToken);
    console.log("Tous les cookies:", req.cookies);
    
    if (!accessToken) {
        return res.status(401).json({ message: 'Access Token not found' });
    }
    
    try {
        const decoded = jwt.verify(accessToken, ACCESS_TOKEN_SECRET);
        req.user = decoded; 
        next();
    } catch (err) {
        console.error("Erreur de vérification JWT:", err.message);
        return res.status(403).json({ message: 'Invalid Access Token' });
    }
}

module.exports = verfyjwt;