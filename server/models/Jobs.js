const db = require("../db/connect");

class Job{
    constructor({job_id, organisation_id, category, title, description, start_dateTime, 
    endDate, hours_needed, num_volunteers, volunteers}) {
        this.job_id = job_id,
        this.organisation_id = organisation_id,
        this.category = category,
        this.title = title,
        this.description = description,
        this.start_dateTime = start_dateTime,
        this.endDate = endDate,
        this.hours_needed = hours_needed,
        this.num_volunteers = num_volunteers,
        this.volunteers = volunteers
    }

    static async getAllJobsOrderedByDateAsc() {
        const response = await db.query("SELECT * FROM jobs ORDER BY start_dateTime");
        if (response.rows.length<1) {
            throw new Error("No jobs in database")
        }

        return response.rows.map(job => new Job(job))
    }
}

module.exports = Job;