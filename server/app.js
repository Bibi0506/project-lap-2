const express = require("express");
const cors = require("cors");

const jobRouter = require("./routers/jobs");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/jobs", jobRouter);


module.exports = app;