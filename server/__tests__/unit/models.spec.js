const jobModel = require('../../models/Jobs');
const db = require('../../db/connect');

test_data = [
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
  ];

describe('Testing Job Model in /models/Jobs.js', () => {
    beforeEach(() => jest.clearAllMocks());

    afterAll(() => jest.resetAllMocks());

    describe('Testing getAllJobsOrderedByDateAsc', () => {
        test('Returns an array of length 2', async () => {
            jest.spyOn(db, 'query').mockResolvedValueOnce(
                {rows:test_data}
            );

            const data = await jobModel.getAllJobsOrderedByDateAsc();
            expect(data).toHaveLength(2);
        })
        test('Each element of returned array is an instance of Job class', async () => {
            jest.spyOn(db, 'query').mockResolvedValueOnce(
                {rows:test_data}
            );

            const data = await jobModel.getAllJobsOrderedByDateAsc();
            data.forEach(row => expect(row).toBeInstanceOf(jobModel))
        })
        test('Each attribute of the Job class is non-null', async () => {
            jest.spyOn(db, 'query').mockResolvedValueOnce(
                {rows:test_data}
            );

            const data = await jobModel.getAllJobsOrderedByDateAsc();
            data.forEach(row => Object.keys(row).forEach(key => expect(row.key).not.toBeNull()))
        })
        test('Method throws error if db returns no data', async () => {
            jest.spyOn(db, 'query').mockResolvedValueOnce({rows:[]});
            /*const data = await jobModel.getAllJobsOrderedByDateAsc();
            console.log("banana", data)
            expect(() => data).toThrow(TypeError)*/
            await expect(jobModel.getAllJobsOrderedByDateAsc()).rejects.toThrowError("No jobs in database");
            
        })
    })
//----------------------------------------------------------------------------------------------------------------------------------
    describe('Testing getJobById method', () => {
        test('Method returns an object', async () => {
            jest.spyOn(db, 'query').mockResolvedValueOnce({rows: [test_data[0]]});
            const data = await jobModel.getJobById(1);

            expect(data).toBeInstanceOf(jobModel);
        })
        test('Method throws error if db returns no data', async () => {
            jest.spyOn(db, 'query').mockResolvedValueOnce({rows:[]});
            /*const data = await jobModel.getAllJobsOrderedByDateAsc();
            console.log("banana", data)
            expect(() => data).toThrow(TypeError)*/
            await expect(jobModel.getJobById()).rejects.toThrowError();
            
        })
    })
    describe('Testing getUserJobs method', () => {
        test('Method returns an object', async () => {
            jest.spyOn(db, 'query').mockResolvedValueOnce({rows: [test_data[0]]});
            const data = await jobModel.getUsersJobs(1);

            expect(data[0]).toBeInstanceOf(jobModel);
        })
        test('Method throws error if db returns no data', async () => {
            jest.spyOn(db, 'query').mockResolvedValueOnce({rows:[]});
            /*const data = await jobModel.getAllJobsOrderedByDateAsc();
            console.log("banana", data)
            expect(() => data).toThrow(TypeError)*/
            await expect(jobModel.getUsersJobs(1)).rejects.toThrowError();
            
        })
    })
    describe('Testing getUserJobsByDate method', () => {
        test('Method returns an object', async () => {
            jest.spyOn(db, 'query').mockResolvedValueOnce({rows: [test_data[0]]});
            const data = await jobModel.getUsersJobsByDate(1, '2023-07-01');

            expect(data[0]).toBeInstanceOf(jobModel);
        })
        test('Method throws error if db returns no data', async () => {
            jest.spyOn(db, 'query').mockResolvedValueOnce({rows:[]});
            /*const data = await jobModel.getAllJobsOrderedByDateAsc();
            console.log("banana", data)
            expect(() => data).toThrow(TypeError)*/
            await expect(jobModel.getUsersJobsByDate(1, '2023-07-01')).rejects.toThrowError();
            
        })
    })
    describe('Testing getUserHours', () => {
        test('Method returns an object', async ()=>{
            jest.spyOn(db, 'query').mockResolvedValueOnce({rows: [{"Hours Worked":4}]});
            const data = await jobModel.getUserHours(1);

            
            expect(data).toBeInstanceOf(Object);
        })
        test('Method returns an object with one property', async ()=>{
            jest.spyOn(db, 'query').mockResolvedValueOnce({rows: [{"Hours Worked":4}]});
            const data = await jobModel.getUserHours(1);
            console.log("data", data.rows)
            //console.log("data[0]", data[0])
            expect(Object.keys(data)).toHaveLength(1);
        })
        // test('Method throws error if db returns no data', async () => {
        //     jest.spyOn(db, 'query').mockResolvedValueOnce({rows:[]});
        //     /*const data = await jobModel.getAllJobsOrderedByDateAsc();
        //     console.log("banana", data)
        //     expect(() => data).toThrow(TypeError)*/
        //     expect(jobModel.getUserHours(1)).toBe(0);
            
        // })
    })
    describe('Testing getPositionByOrganisationId method', () => {
        test('Method returns an object', async () => {
            jest.spyOn(db, 'query').mockResolvedValueOnce({rows: test_data});
            const data = await jobModel.getPositionByOrganisationId(5);

            expect(data[0]).toBeInstanceOf(jobModel);
        })
        test('Method throws error if db returns no data', async () => {
            jest.spyOn(db, 'query').mockResolvedValueOnce({rows:[]});
            /*const data = await jobModel.getAllJobsOrderedByDateAsc();
            console.log("banana", data)
            expect(() => data).toThrow(TypeError)*/
            await expect(jobModel.getPositionByOrganisationId(5)).rejects.toThrowError();
            
        })
    })
})