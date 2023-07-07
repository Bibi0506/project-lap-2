//receive the rquest, check the specific header = error
const Token = require("../models/token");

async function authenticatorVolunteer(req, res, next) {
  try {
    //check (headers) that the token is valid
    const userToken = req.headers["authorisation"];
    const is_organisation = req.headers["is_organisation"];

    if (userToken == "null" || is_organisation == "true") {
      throw new Error("User not authenticated.");
    } else {
      //check if token esist in the data
      const validToken = await Token.getOneByToken(userToken);
      next(); //moving on in the middleware stack
    }
  } catch (err) {
    console.log(err);
    res.status(403).json({ error: err.message });
    next(err);
  }
}

async function authenticatorOrganisation(req, res, next) {
  try {
    //check (headers) that the token is valid
    const userToken = req.headers["authorisation"];
    const is_organisation = req.headers["is_organisation"];

    if (userToken == "null" || is_organisation == "false") {
      throw new Error("User not authenticated.");
    } else {
      //check if token esist in the data
      const validToken = await Token.getOneByToken(userToken);
      next(); //moving on in the middleware stack
    }
  } catch (err) {
    res.status(403).json({ error: err.message });
  }
}

module.exports = { authenticatorVolunteer, authenticatorOrganisation };
