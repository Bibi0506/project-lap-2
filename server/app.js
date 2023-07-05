const express = require("express");
const cors = require("cors");
const authenticator = require("./middleware/authenticator");

const logRoutes = require('./middleware/logger');
const jobRouter = require('./routers/jobs');
const postRouter = require('./routers/post');
const userRouter = require('./routers/user');

const app = express();
app.use(cors());
app.use(express.json());
app.use(logRoutes);
app.use(authenticator);

app.use("/jobs", jobRouter);
app.use("/posts", postRouter);
app.use("/users", userRouter);


module.exports = app;