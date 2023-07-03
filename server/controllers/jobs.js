const Job = require("../models/Jobs");

async function index(req, res) {
    try {
        const jobs = await Job.getAllJobsOrderedByDateAsc();
        res.status(200).send(jobs);
    } catch(err) {
        res.status(500).send({"error": err.message});
    }
}

module.exports = {index};