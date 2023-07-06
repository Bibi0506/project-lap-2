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
                "num_volunteers": 2,
                "address": "asdfsd"
            }, {
                "job_id": 2,
                "user_id": 5,
                "category": "Customer Services",
                "title": "Library Assistant",
                "description": "You will be assisting the manager to re-organise the bookshelves",
                "start_dateTime": "2023-07-06T09:00:00.000Z",
                "endDate": "2023-07-06T23:59:59.000Z",
                "hours_needed": 2,
                "num_volunteers": 1,
                "address": "awfsa"
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
        test('each object in res.body has 10 properties', async () => {
            const res = await request(server).get('/jobs/getall');
            res.body.forEach(row => expect(Object.keys(row).length).toBe(10))
        })
        test('res.body[0].job_id = 1', async () => {
            const res = await request(server).get('/jobs/getall');
            expect(res.body[0].job_id).toBe(1);
        })

        //This clears the mocked data from the model
        jest.clearAllMocks();

        test('sends response with status code of 500 when no data is available', async () => {
            //Mocks the case where no data is available
            jobModel.getAllJobsOrderedByDateAsc.mockImplementation(new Error("asdd"));
            const res = await request(server).get('/jobs/getall');
            
            expect(res.status).toBe(500);
        })
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
                    "num_volunteers": 2,
                    "address": "sdasvas"
                }, {
                    "job_id": 2,
                    "user_id": 5,
                    "category": "Customer Services",
                    "title": "Library Assistant",
                    "description": "You will be assisting the manager to re-organise the bookshelves",
                    "start_dateTime": "2023-07-06T09:00:00.000Z",
                    "endDate": "2023-07-06T23:59:59.000Z",
                    "hours_needed": 2,
                    "num_volunteers": 1,
                    "address": "agadgs"
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
            test('each object in res.body has 10 properties', async () => {
                const res = await request(server).get('/jobs/user/1');
                res.body.forEach(row => expect(Object.keys(row).length).toBe(10))
            })

                //This clears the mocked data from the model
            jest.clearAllMocks();

            test('sends response with status code of 500 when no data is available', async () => {
                //Mocks the case where no data is available
                jobModel.getUsersJobs.mockImplementation(new Error("asdd"));
                const res = await request(server).get('/jobs/users/1');
                
                expect(res.status).toBe(404);
            })
        })
//----------------------------------------------------------------------------------------------------------------------------

    describe('GET jobs by User and date /jobs/user/:user_id/:date', () => {
        test('sends response with status code of 200', async () => {
            //This mocks data being returned from the Model
            jobModel.getUsersJobsByDate.mockResolvedValue([{
                "job_id": 1,
                "user_id": 5,
                "category": "Customer Services",
                "title": "Library Assistant",
                "description": "You will be assisting the manager to re-organise the bookshelves",
                "start_dateTime": "2023-07-01T09:00:00.000Z",
                "endDate": "2023-07-02T23:59:59.000Z",
                "hours_needed": 2,
                "num_volunteers": 2,
                "address": "asdfsadf"
            }]);

            const res = await request(server).get('/jobs/user/1/2023-07-01');
            expect(res.status).toBe(200);
        })
        test('response body has a length of 1', async () => {
            const res = await request(server).get('/jobs/user/1/2023-07-01');
            expect(res.body).toHaveLength(1);
        })
        test('all objects in res.body have property "job_id"', async () => {
            const res = await request(server).get('/jobs/user/1/2023-07-01');
            res.body.forEach(row => expect(row).toHaveProperty("job_id"))
        })
        test('each object in res.body has 10 properties', async () => {
            const res = await request(server).get('/jobs/user/1/2023-07-01');
            res.body.forEach(row => expect(Object.keys(row).length).toBe(10))
        })
        test('desired date is between start date and end date', async () => {
            const res = await request(server).get('/jobs/user/1/2023-07-01');
            const comp1 = new Date(res.body[0].start_dateTime) <= new Date('2023-07-01T23:59:59.000Z');
            const comp2 = new Date(res.body[0].endDate) >= new Date('2023-07-01T00:00:00.000Z');
            expect(comp1 && comp2).toBeTruthy();
            
        })

        //This clears the mocked data from the model
        jest.clearAllMocks();

        test('sends response with status code of 500 when no data is available', async () => {
            //Mocks the case where no data is available
            jobModel.getUsersJobsByDate.mockImplementation(new Error("asdd"));
            const res = await request(server).get('/jobs/user/1/2023-07-01');
            
            expect(res.status).toBe(404);
        })
    })
//----------------------------------------------------------------------------------------------------------------------------
    
    describe('GET hours worked by user /jobs/hours/user/1', () => {
        test('server responds with status code 200', async () => {
            jobModel.getUserHours.mockResolvedValue({"Hours Worked":4});

            const res = await request(server).get('/jobs/hours/user/1');
            expect(res.status).toBe(200);
        })
        test('response has property "Hours Worked"', async () => {

            const res = await request(server).get('/jobs/hours/user/1');

            expect(res.body).toHaveProperty("Hours Worked");
            expect(res.body["Hours Worked"]).toBe(4);
        })
        test('Response gives total hours worked as 4', async () => {

            const res = await request(server).get('/jobs/hours/user/1');

            expect(res.body["Hours Worked"]).toBe(4);
        })

        //This clears the mocked data from the model
        jest.clearAllMocks();

        test('sends response with status code of 500 when no data is available', async () => {
            //Mocks the case where no data is available
            jobModel.getUserHours.mockImplementation(new Error("asdd"));
            const res = await request(server).get('/jobs/hours/user/1');
            
            expect(res.status).toBe(500);
        })
    })
//----------------------------------------------------------------------------------------------------------------------------
    describe('GET route to get all jobs by an organisations id /jobs/organisations/:id', () => {
        test('server responds with status code 200', async () => {
            jobModel.getPositionByOrganisationId.mockResolvedValue([
                {
                  "job_id": 1,
                  "user_id": 5,
                  "category": "Customer Services",
                  "title": "Library Assistant",
                  "description": "You will be assisting the manager to re-organise the bookshelves",
                  "start_dateTime": "2023-07-01T09:00:00.000Z",
                  "endDate": "2023-07-02T23:59:59.000Z",
                  "hours_needed": 2,
                  "num_volunteers": 2,
                  "address": "dsfbdv"
                },
                {
                  "job_id": 2,
                  "user_id": 5,
                  "category": "Customer Services",
                  "title": "Library Assistant",
                  "description": "You will be assisting the manager to re-organise the bookshelves",
                  "start_dateTime": "2023-07-06T09:00:00.000Z",
                  "endDate": "2023-07-06T23:59:59.000Z",
                  "hours_needed": 2,
                  "num_volunteers": 1,
                  "address": "dsfbdv"
                }
              ]);

            const res = await request(server).get('/jobs/organisations/5');

            expect(res.status).toBe(200);
        })
        test('response body has length of 2', async () => {

              const res = await request(server).get('/jobs/organisations/5');

              expect(res.body).toHaveLength(2);
        })
        test('each response has 10 properties', async () => {

            const res = await request(server).get('/jobs/organisations/5');

            res.body.forEach(row => expect(Object.keys(row).length).toBe(10));
        })
        test('each response has address property', async () => {

            const res = await request(server).get('/jobs/organisations/5');

            res.body.forEach(row => expect(row).toHaveProperty("address"));
        })
        test('each response has the user_id of 5', async () => {

            const res = await request(server).get('/jobs/organisations/5');

            res.body.forEach(row => expect(row.user_id).toBe(5));
        })

        //This clears the mocked data from the model
        jest.clearAllMocks();

        test('sends response with status code of 500 when no data is available', async () => {
            //Mocks the case where no data is available
            jobModel.getPositionByOrganisationId.mockImplementation(new Error("asdd"));
            const res = await request(server).get('/jobs/organisations/5');
            
            expect(res.status).toBe(404);
        })
    })
//----------------------------------------------------------------------------------------------------------------------------
    describe('GET route to return all jobs associated with a user /jobs/user/:id', () => {
        let applications = [
            {
              "application_id": 1,
              "job_id": 1,
              "user_id": 1
            },
            {
              "application_id": 2,
              "job_id": 1,
              "user_id": 2
            }
          ];
        
        
        test('server responds with status code of 200', async () => {
            jobModel.getUsersJobs.mockResolvedValue([
                {
                  "job_id": 1,
                  "user_id": 5,
                  "category": "Customer Services",
                  "title": "Library Assistant",
                  "description": "You will be assisting the manager to re-organise the bookshelves",
                  "start_dateTime": "2023-07-01T09:00:00.000Z",
                  "endDate": "2023-07-02T23:59:59.000Z",
                  "hours_needed": 2,
                  "num_volunteers": 2,
                  "address": "dsfbdv"
                }
              ]);
            
              const res = await request(server).get('/jobs/user/1');
              expect(res.status).toBe(200)
        })
        test('Number of rows in response.body is equal to the number of applications with a user_id of 1', async () => {

            const res = await request(server).get('/jobs/user/1');

            let num_applications = 0;
            applications.forEach(el => el.user_id == 1? num_applications +=1 : num_applications +=0);
            expect(res.body.length).toBe(num_applications);
        })
        test('response body contains 10 properties', async () => {

            const res = await request(server).get('/jobs/user/1');

            expect(Object.keys(res.body[0])).toHaveLength(10);
        })
        test('each row in response body contains address property', async () => {

            const res = await request(server).get('/jobs/user/1');

            expect(res.body[0]).toHaveProperty("address");
        })

        //This clears the mocked data from the model
        jest.clearAllMocks();

        test('sends response with status code of 500 when no data is available', async () => {
            //Mocks the case where no data is available
            jobModel.getAllJobsOrderedByDateAsc.mockImplementation(new Error("asdd"));
            const res = await request(server).get('/jobs/getall');
            
            expect(res.status).toBe(500);
        })
        
    })
})
