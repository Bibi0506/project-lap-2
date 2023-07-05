const Application = require("../models/Applications");

async function create(req, res) {
    try{
        const data = req.body;
        const application = await Application.createApplication(data);
        res.status(201).send(application);
    } catch(err) {
        res.status(400).json({"error": err.message})
    }
}

async function index(req, res) {
    try{
        const applications = await Application.getAll();
        res.status(200).send(applications)
    } catch(err) {
        res.status(500).json({"error": err.message})
    }
}

async function show(req, res) {
    try{
        const application_id = parseInt(req.params.application_id);
        const application = await Application.getOneById(application_id);
        res.status(200).send(application);
    } catch(err) {
        res.status(404).json({"error": err.message})
    }
}

async function destroy(req, res) {
    try{
        const application_id = parseInt(req.params.application_id);
        const application = await Application.getOneById(application_id);
        const result = await application.delete(application_id);
        res.status(204).send(result);

    } catch(err) {
        res.status(404).json({"error": err.message})
    }
}

module.exports = {create, index, show, destroy};