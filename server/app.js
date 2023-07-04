const express = require("express");
const cors = require("cors");

const jobRouter = require("./routers/jobs");
const userRouter = require("./routers/user");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/jobs", jobRouter);
app.use("/user", userRouter);

module.exports = app;
