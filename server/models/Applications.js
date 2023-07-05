const db = require("../db/connect");

class Application {

    constructor ({application_id, job_id, user_id}) {
        this.application_id = application_id,
        this.job_id = job_id,
        this.user_id = user_id
    }

    static async createApplication(data) {
        const response = await db.query("INSERT INTO applications (job_id, user_id) VALUES ($1, $2) RETURNING *", [data.job_id, data.user_id]);

        if (response.rows.length != 1) {
            throw new Error("Unable to add application to database")
        }

        return new Application(response.rows[0])
    }

    static async getOneById(application_id) {
        const response = await db.query("SELECT * FROM applications WHERE application_id = $1;", [application_id]);

        if (response.rows.length != 1) {
            throw new Error(`Unable to find application ${application_id}`);
        }

        return new Application(response.rows[0])
    }

    static async getAll() {
        const response = await db.query("SELECT * FROM applications;");

        if (response.rows.length === 0) {
            throw new Error('No applications available');
        }
        console.log(response.rows.map(application => new Application(application)));
        return response.rows.map(application => new Application(application))
    }

    async delete(application_id) {
        const response = await db.query("DELETE FROM applications WHERE application_id = $1 RETURNING *", [application_id]);

        if (response.rows.length != 1) {
            throw new Error(`Unable to delete application ${application_id}`);
        }

        return new Application(response.rows[0])
    }
}

module.exports = Application;