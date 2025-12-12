function decodeToken(token) {
    try {
        const base64Payload = token.split('.')[1]; // la partie payload
        const decodedPayload = Buffer.from(base64Payload, 'base64').toString('utf8');
        return JSON.parse(decodedPayload);
    } catch (error) {
        console.error("Erreur lors du décodage du token:", error.message);
        return null;
    }
}
module.exports = decodeToken;