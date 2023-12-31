const express = require("express");
const cors = require("cors");

const logRoutes = require("./middleware/logger");
const jobRouter = require("./routers/jobs");
const userRouter = require("./routers/user");
const applicationRouter = require("./routers/applications");

const app = express();
app.use(cors());
app.use(express.json());
app.use(logRoutes);

app.use("/jobs", jobRouter);
app.use("/applications", applicationRouter);
app.use("/users", userRouter);

module.exports = app;
