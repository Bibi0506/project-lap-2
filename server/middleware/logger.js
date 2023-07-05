function logRoutes(req, res, next) {
    console.log(req.method, req.originalUrl);
    next();
}

module.exports = logRoutes;
// have the methods of the req and the url of the req logged into the console