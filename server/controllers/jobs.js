const Job = require("../models/Jobs.js");

// GET route returning all listed jobs, ordered by start date
async function index(req, res) {
    try {
        const jobs = await Job.getAllJobsOrderedByDateAsc();
        if (jobs.length<1) {
            throw new Error("No jobs in database");
        }
        res.status(200).send(jobs);
    } catch(err) {
        res.status(500).send({"error": err.message});
    }
};

//GET route to get all position by organization_id
async function show(req, res) {
    try {
        const organisation_id = req.params.id;
        //retrieve the positions by organisation ID
        const positions = await Job.getPositionByOrganisationId(organisation_id);

        res.status(200).send(positions)
    } catch(err) {
        res.status(404).send({"error": err.message});
    }

}


//GET route to get all jobs by jobs_id 
async function showJobsById(req, res) {
    try {
      const job_id = req.params.id;
  
      // Retrieve the job by its ID
      const job = await Job.getJobById(job_id);
      if (!job) {
        throw new Error("Job not found."); // Throw an error if the job is not found
      }
  
      res.status(200).send(job);
    } catch (err) {
      res.status(404).send({ error: err.message });
    }
  }
  


//POST route to create a new job post
async function create(req, res) {
    try{
        const data = req.body;
        const response = await Job.createJob(data);
        res.status(201).send(response);
    } catch (err) {
        res.status(400).send({"error": err.message})
    }
}

//GET route returning all listed jobs assigned to the user.
async function userJobs(req, res) {
    try {
        user_id = parseInt(req.params.user_id);
        const jobs = await Job.getUsersJobs(user_id);
        //console.log(jobs)
        res.status(200).send(jobs);
    } catch(err) {
        res.status(404).send({"error": err.message});
    }
}

//GET route returning all listed jobs assigned to the user on the specified date.
async function userJobsDate(req, res) {
    try {
        user_id = parseInt(req.params.user_id);
        date = req.params.date;

        const jobs = await Job.getUsersJobsByDate(user_id, date);

        res.status(200).send(jobs);
    } catch(err) {
        res.status(404).send({"error": err.message});
    }
}

async function destroy(req, res) {
    try {
        const job_id = req.params.id;
        const job = await Job.getJobById(job_id); // Retrieve a job by its ID
      
        if (!job) {
            throw new Error("Job not found."); // Throw an error if the job is not found
        }
        await job.destroy(); // Call the destroy method on the job instance
        res.status(204).end(); // Send a 204 No Content response to indicate successful deletion
    } catch (err) {
        res.status(404).send({ error: err.message }); // Send a 404 Not Found response if there's an error
    }
}

async function getHours(req, res) {
    try {
        const user_id = parseInt(req.params.user_id);
        const hours = await Job.getUserHours(user_id);

        res.status(200).send(hours)
    } catch(err) {
        res.status(500).send({"error": err.message});
    }
}

module.exports = {index, userJobs, userJobsDate, getHours,
                    show, showJobsById, create, destroy};