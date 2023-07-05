const {Router} = require("express");
const userRouter = Router();

const userController = require("../controllers/user");

//Handles regitration and login
//postRouter.post("/register", userController.register);
//userRouter.post("/login", userController.login);


userRouter.post("/register", userController.register);
userRouter.post("/login", userController.login);

module.exports = userRouter;