//receive the rquest, check the specific header = error
const Token = require("../models/token");

async function authenticator(req, res, next) {
    try {//check (headers) that the token is valid
        const userToken = req.headers["authorization"];

        if (userToken == "null") {
            throw new Error("User not authenticated.");
        } else {//check if token esist in the data
            const validToken = await Token.getOneByToken(userToken);
            next();//moving on in the middleware stack 
        }

    } catch (err) {
        res.status(403).json({ error: err.message });
    }
}

module.exports = authenticator;