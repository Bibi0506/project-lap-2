const { Router } = require("express");
const jobController = require("../controllers/jobs");
/*const {
  authenticatorVolunteer,
  authenticatorOrganisation,
} = require("../middleware/authenticator");*/

const jobRouter = Router();

//GET route to return all job listings
jobRouter.get("/getall", /*authenticatorVolunteer,*/ jobController.index);

//GET route to return all job listings associated to the user on a specific date
jobRouter.get("/user/:user_id/:date", jobController.userJobsDate);

//GET route to return all job listings associated to the user
jobRouter.get("/user/:user_id", jobController.userJobs);

//GET route to return sum of hours worked by user
jobRouter.get("/hours/user/:user_id", jobController.getHours);

//GET route to return an organisations contact details
jobRouter.get('/contact/:id', jobController.getOrgContactDetails);

//GET route to get all position by organization_id
jobRouter.get(
  "/organisations/:id",
/*authenticatorOrganisation,*/
  jobController.show
);

//GET route to get all jobs by id
jobRouter.get("/jobs/:id", jobController.showJobsById);
//POST route to post new job
jobRouter.post("/", jobController.create);
//DELETE route to delete job posts
jobRouter.delete("/:id", jobController.destroy);
//Get all job by category(id?)

jobRouter.get("/:id", jobController.show);

module.exports = jobRouter;