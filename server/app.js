const express = require("express");
const cors = require("cors");

const jobRouter = require("./routers/jobs");
const applicationRouter = require("./routers/applications")

const app = express();
app.use(cors());
app.use(express.json());

app.use("/jobs", jobRouter);
app.use("/applications", applicationRouter);


module.exports = app;