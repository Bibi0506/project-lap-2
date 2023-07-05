const express = require("express");
const postController = require("../controllers/post");
//const userController = require('../controllers/user');
const authenticator = require('../middleware/authenticator');

const postRouter = express.Router();
const userRouter = express.Router();

postRouter.get("/", authenticator, postController.index);
postRouter.post("/", postController.create);
postRouter.get("/:id", postController.show);
postRouter.delete("/:id", postController.destroy);

module.exports = postRouter;
