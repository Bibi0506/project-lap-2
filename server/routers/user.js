const {Router} = require("express");

const userController = require("../controllers/jobs");

const userRouter = Router();

userRouter.post("/register", userController.register);
userRouter.post("/login", userController.login);

module.exports = userRouter;