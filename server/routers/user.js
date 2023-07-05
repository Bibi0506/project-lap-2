const {Router} = require("express");
const userRouter = Router();

const userController = require("../controllers/user");

userRouter.post("/register", userController.register);
userRouter.post("/login", userController.login);

module.exports = userRouter;