const db = require("../db/connect");

class Job{
    constructor({job_id, organisation_id, category, title, description, start_dateTime, 
    endDate, hours_needed, num_volunteers}) {
        this.job_id = job_id,
        this.organisation_id = organisation_id,
        this.category = category,
        this.title = title,
        this.description = description,
        this.start_dateTime = start_dateTime,
        this.endDate = endDate,
        this.hours_needed = hours_needed,
        this.num_volunteers = num_volunteers
    }

    //retrieve a job by its job_id
    static async getJobById(jobId) {
        try{
            const response = await db.query("SELECT * FROM jobs WHERE job_id = $1", [jobId]);
            if (response.rows.length !== 1) {
                throw new Error("Unable to locate job.");
              }
            return new Job(response.rows[0]);
        } catch(error) {
            console.error("Error retrieving job by ID:", error);
            throw new Error("Failed to retrieve job by ID. Please try again later.");
        }
    }

    static async getAllJobsOrderedByDateAsc() {
        const response = await db.query("SELECT * FROM jobs ORDER BY start_dateTime");
        if (response.rows.length<1) {
            throw new Error("No jobs in database")
        }

        return response.rows.map(job => new Job(job))
    }



    static async getPositionByOrganisationId(organisation_id) {
        try {
          const response = await db.query("SELECT title, description FROM jobs j JOIN Users u ON j.user_id = u.id WHERE u.is_organisation = true AND u.id = $1", [organisation_id]);
        
          if (response.rows.length === 0) {
            throw new Error("Unable to locate job.");
          }
        
          return response.rows.map((job) => ({
            title: job.title,
            description: job.description,
          }));
        } catch (error) {
          console.error("Error retrieving positions from the database:", error);
          throw error;
        }
    }

    static async getUsersJobs(user_id) {
        const response = await db.query("SELECT J.job_id, J.user_id, J.category, J.title, J.description, J.start_datetime, J.enddate, J.hours_needed, J.num_volunteers FROM Applications AS A JOIN jobs as J on (J.job_id = A.job_id) WHERE A.user_id = $1", [user_id]);

        if (response.rows.length<1) {
            throw new Error("This user has not signed up for any volunteering positions as of yet.")
        }

        return response.rows.map(job => new Job(job))
    }

    static async getUsersJobsByDate(user_id, date) {
        //' 23:59:59' is added to the date such that the start time doesn't affect whether or not the date is included in the results.
        const response = await db.query("SELECT J.job_id, J.user_id, J.category, J.title, J.description, J.start_datetime, J.enddate, J.hours_needed, J.num_volunteers FROM Applications AS A JOIN jobs as J on (J.job_id = A.job_id) WHERE A.user_id = $1 AND J.start_datetime <= $2 AND J.enddate >= $3;", [user_id, date+' 23:59:59', date]);
        if (response.rows.length<1) {
            throw new Error("This user has not signed up for any volunteering positions on this date as of yet.")
        }
        return response.rows.map(job => new Job(job))
    }

    static async createJob(data) {
        try {
            const { title, category, start_dateTime, endDate, hours_needed, num_volunteers, user_id } = data;
            const response = await db.query("INSERT INTO jobs (title, category, start_dateTime, endDate, hours_needed, num_volunteers, user_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING job_id;",
            [title, category, start_dateTime, endDate, hours_needed, num_volunteers, user_id]
            );
            const job_id = response.rows[0].job_id;
            const newJob = await Jobs.getPositionByOrganisationId(user_id);
            return newJob;
        } catch(error) {
        console.error("Error creating job:", error);
        throw new Error("Failed to create job. Please try again later.");
        }
    }

    static async getUserHours(user_id) {
        const response = await db.query("SELECT SUM(J.hours_needed * (J.enddate::DATE - J.start_datetime::DATE + 1)) FROM Applications AS A JOIN jobs as J on (J.job_id = A.job_id) WHERE A.user_id = $1;", [user_id]);
        
        if (!response.rows[0]) {
            return 0
        } else if (typeof response.rows[0] != 'number') {
            throw new Error("Failed to retrieve num hours worked by user")
        }

        return response.rows[0]
    }

    async destroy() {
        try {
          const response = await db.query("DELETE FROM jobs WHERE job_id = $1 RETURNING *;", [this.job_id]);
          return response.rows[0];
        } catch (error) {
          console.error("Error deleting job:", error);
          throw new Error("Failed to delete job. Please try again later.");
        }
      }


      

}


module.exports = Job;