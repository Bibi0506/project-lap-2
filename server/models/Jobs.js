const db = require("../db/connect");

class Job{
    constructor({job_id, user_id, category, title, description, start_datetime, 
    enddate, hours_needed, num_volunteers, address}) {
        this.job_id = job_id,
        this.user_id = user_id,
        this.category = category,
        this.title = title,
        this.description = description,
        this.start_dateTime = start_datetime,
        this.endDate = enddate,
        this.hours_needed = hours_needed,
        this.num_volunteers = num_volunteers
        this.address = address
    }

    //retrieve a job by its job_id
    static async getJobById(jobId) {
        try{
            const response = await db.query("SELECT J.*, U.address FROM jobs AS J JOIN Users AS U ON J.user_id = U.id WHERE job_id = $1", [jobId]);
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
        const response = await db.query("SELECT J.*, U.address FROM jobs AS J JOIN Users AS U ON J.user_id = U.id ORDER BY start_dateTime");
        if (!response.rows.length>0) {
            throw new Error("No jobs in database")
        }

        return response.rows.map(job => new Job(job))
    }



    static async getPositionByOrganisationId(organisation_id) {
        try {
          const response = await db.query("SELECT j.*, u.address FROM jobs j JOIN Users u ON j.user_id = u.id WHERE u.is_organisation = true AND u.id = $1", [organisation_id]);
        
          if (response.rows.length === 0) {
            throw new Error("Unable to locate job.");
          }
        
          return response.rows.map(row => new Job(row));
        } catch (error) {
          console.error("Error retrieving positions from the database:", error);
          throw error;
        }
    }

    static async getUsersJobs(user_id) {
        const response = await db.query("SELECT J.*, U.address FROM Applications AS A JOIN jobs as J on (J.job_id = A.job_id) JOIN Users AS U on (J.user_id = U.id) WHERE A.user_id = $1", [user_id]);

        if (response.rows.length<1) {
            throw new Error("This user has not signed up for any volunteering positions as of yet.")
        }

        return response.rows.map(job => new Job(job))
    }

    static async getUsersJobsByDate(user_id, date) {
        //input time needs to be transformed to '23:59:59.000Z+1' such that the volunteering start time doesn't affect whether they're selected, the endtime needs to be transformed to '00:00:00.000Z+1' for the same reason
        const response = await db.query("SELECT J.*, U.address FROM Applications AS A JOIN jobs as J on (J.job_id = A.job_id) JOIN Users AS U ON (J.user_id = U.id) WHERE A.user_id = $1 AND J.start_datetime <= $2 AND J.enddate >= $3;", [user_id, date+' 23:59:59', date]);

        if (response.rows.length<1) {
            throw new Error("This user has not signed up for any volunteering positions on this date as of yet.")
        }
        return response.rows.map(job => new Job(job))
    }

    static async getContactDetailsById(id) {
        const response = await db.query("SELECT id, name, email, phone_number, address FROM Users WHERE id = $1", [id]);

        if (response.rows.length != 1) {
            throw new Error("Unable to return organisations contact details")
        }

        return response.rows
    }




    static async createJob(data) {
        if (Object.keys(data).length !== 8){
            throw new Error("Data in incorrect format")
        }
        const {user_id, category, title, description, start_dateTime, endDate, hours_needed, num_volunteers} = data;
        const response = await db.query("INSERT INTO jobs (user_id, category, title, description, start_dateTime, endDate, hours_needed, num_volunteers) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING job_id;",
        [user_id, category, title, description, start_dateTime, endDate, hours_needed, num_volunteers]
        );

        if (response.rows.length!==1){
            throw new Error("Error in creating Job")
        }

        const job_id = response.rows[0].job_id;
        const newJob = await Job.getJobById(job_id);

        return newJob;
    }

    static async getUserHours(user_id) {
        const response = await db.query('SELECT SUM(J.hours_needed * (J.enddate::DATE - J.start_datetime::DATE + 1)) AS "Hours Worked" FROM Applications AS A JOIN jobs as J on (J.job_id = A.job_id) WHERE A.user_id = $1;', [user_id]);

        try{
            if (response.rows.length<1) {
                return 0
            }
        } catch (err) {
            return 0
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
