const {Router} = require("express");

const applicationController = require("../controllers/applications");

const applicationRouter = Router();

applicationRouter.post("/create", applicationController.create);
applicationRouter.get("/index", applicationController.index)
applicationRouter.get("/id/:application_id", applicationController.show);
applicationRouter.delete("/id/:application_id", applicationController.destroy);

module.exports = applicationRouter;