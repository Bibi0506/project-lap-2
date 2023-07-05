const request = require('supertest');
const express = require('express');
const jobModel = require('../models/Jobs');
const jobRouter = require('../routers/jobs');

const server = express();
server.use(express.json());

jest.mock('../models/Jobs');

describe('Testing jobRouter endpoints', () => {
    beforeAll(()=> {
        server.use('/jobs', jobRouter);
        jest.clearAllMocks();
    });

    describe('GET all jobs /jobs/getall', () => {
        test('sends response with status code of 200', async () => {
            //This mocks data being returned from the Model
            jobModel.getAllJobsOrderedByDateAsc.mockResolvedValue([{
                "job_id": 1,
                "user_id": 5,
                "category": "Customer Services",
                "title": "Library Assistant",
                "description": "You will be assisting the manager to re-organise the bookshelves",
                "start_dateTime": "2023-07-01T09:00:00.000Z",
                "endDate": "2023-07-02T23:59:59.000Z",
                "hours_needed": 2,
                "num_volunteers": 2
            }, {
                "job_id": 2,
                "user_id": 5,
                "category": "Customer Services",
                "title": "Library Assistant",
                "description": "You will be assisting the manager to re-organise the bookshelves",
                "start_dateTime": "2023-07-06T09:00:00.000Z",
                "endDate": "2023-07-06T23:59:59.000Z",
                "hours_needed": 2,
                "num_volunteers": 1
              }]);
            const res = await request(server).get('/jobs/getall');
            expect(res.status).toBe(200);
        })
        test('response body has a length of 2', async () => {
            const res = await request(server).get('/jobs/getall');
            expect(res.body).toHaveLength(2);
        })
        test('all objects in res.body have property "job_id"', async () => {
            const res = await request(server).get('/jobs/getall');
            res.body.forEach(row => expect(row).toHaveProperty("job_id"))
        })
        test('each object in res.body has 9 properties', async () => {
            const res = await request(server).get('/jobs/getall');
            res.body.forEach(row => expect(Object.keys(row).length).toBe(9))
        })
        test('res.body[0].job_id = 1', async () => {
            const res = await request(server).get('/jobs/getall');
            expect(res.body[0].job_id).toBe(1);
        })

        //This clears the mocked data from the model
        jest.clearAllMocks();

        test('sends response with status code of 500 when no data is available', async () => {
            //Mocks the case where no data is available
            jobModel.getAllJobsOrderedByDateAsc.mockResolvedValue([]);
            const res = await request(server).get('/jobs/getall');
            
            expect(res.status).toBe(500);
        })

//----------------------------------------------------------------------------------------------------------------------------

        jest.clearAllMocks();
        describe('GET all jobs by User /jobs/user/:id', () => {
            test('sends response with status code of 200', async () => {
                //This mocks data being returned from the Model
                jobModel.getUsersJobs.mockResolvedValue([{
                    "job_id": 1,
                    "user_id": 5,
                    "category": "Customer Services",
                    "title": "Library Assistant",
                    "description": "You will be assisting the manager to re-organise the bookshelves",
                    "start_dateTime": "2023-07-01T09:00:00.000Z",
                    "endDate": "2023-07-02T23:59:59.000Z",
                    "hours_needed": 2,
                    "num_volunteers": 2
                }, {
                    "job_id": 2,
                    "user_id": 5,
                    "category": "Customer Services",
                    "title": "Library Assistant",
                    "description": "You will be assisting the manager to re-organise the bookshelves",
                    "start_dateTime": "2023-07-06T09:00:00.000Z",
                    "endDate": "2023-07-06T23:59:59.000Z",
                    "hours_needed": 2,
                    "num_volunteers": 1
                  }]);
                const res = await request(server).get('/jobs/user/5');
                expect(res.status).toBe(200);
            })
            test('response body has a length of 2', async () => {
                const res = await request(server).get('/jobs/user/1');
                expect(res.body).toHaveLength(2);
            })
            test('all objects in res.body have property "job_id"', async () => {
                const res = await request(server).get('/jobs/user/1');
                res.body.forEach(row => expect(row).toHaveProperty("job_id"))
            })
            test('each object in res.body has 9 properties', async () => {
                const res = await request(server).get('/jobs/user/1');
                res.body.forEach(row => expect(Object.keys(row).length).toBe(9))
            })
            test('res.body[0].job_id = 1', async () => {
                const res = await request(server).get('/jobs/user/1');
                expect(res.body[0].job_id).toBe(1);
            })
    
            //This clears the mocked data from the model
            jest.clearAllMocks();
    
            test('sends response with status code of 500 when no data is available', async () => {
                //Mocks the case where no data is available
                jobModel.getUsersJobs([]);
                const res = await request(server).get('/jobs/user/1');
                
                expect(res.status).toBe(500);
            })        
        

    
    
    
    
    
    
        })
    })
})