const {Router} = require("express");

const jobController = require("../controllers/jobs");

const jobRouter = Router();

jobRouter.get("/getall", jobController.index);

module.exports = jobRouter;