const {Router} = require("express");

const jobController = require("../controllers/jobs");

const jobRouter = Router();

//GET route to return all job listings
jobRouter.get("/getall", jobController.index);

//GET route to return all job listings associated to the user on a specific date
jobRouter.get("/user/:user_id/:date", jobController.userJobsDate);

//GET route to return all job listings associated to the user
jobRouter.get("/user/:user_id", jobController.userJobs);

//GET route to return sum of hours worked by user
jobRouter.get("/hours/user/:user_id", jobController.getHours);

//GET route to get all position by organization_id
jobRouter.get("/organisations/:id", jobController.show);
//GET route to gett all jobs by id
jobRouter.get("/jobs/:id", jobController.showJobsById);

//POST route to post new job
jobRouter.post("/", jobController.create);
//DELETE route to delete job posts
jobRouter.delete("/:id", jobController.destroy);

//Handles regitration and login
//jobRouter.post("/register", userController.register);
//jobRouter.post("/login", userController.login);
//Get all job by category(id?)
jobRouter.get("/:id", jobController.show);

module.exports = jobRouter;