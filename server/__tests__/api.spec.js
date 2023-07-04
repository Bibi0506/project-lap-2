//const app = require("../app");
//const request = require("supertest");

//describe("GET jobs/getall", ()=>{

//    test("responds with a status code of 200", async()=>{
//        const response = await request(app).get("/jobs/getall")
//        expect(response.statusCode).toBe(200)
//    })

//})





const { beforeEach } = require("node:test");
const jobController = require("../controllers/jobs");
const Job = require("../models/Jobs");

const mockSend = jest.fn();
const mockStatus = jest.fn(code => ({send:mockSend, end:jest.fn()}));
const mockRes = {status:mockStatus};

describe("Jobs Controller Tests", () => {
    beforeEach(() => jest.clearAllMocks());

    afterAll(() => jest.resetAllMocks());

    describe("Testing index() ", () => {
        test("Responds with a 200 status code", async () => {
            let 
        })
    })
})