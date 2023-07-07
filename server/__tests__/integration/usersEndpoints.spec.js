const { createDbEnv, populateDbEnv, destroyDbEnv } = require('../../db/setup-test-db')
const app = require('../../app');
const request = require('supertest');


describe('users endpoints', () => {
  let api;

  beforeEach(async () => {
    await createDbEnv()
    await populateDbEnv()
  })

  afterEach(async () => {
    await destroyDbEnv()
  })
  
  beforeAll(async () => {
    api = app.listen(5002, () => console.log('Test server running on port 5002'))
  });
  

  afterAll(async () => {
    console.log('Gracefully stopping test server')
    await api.close()
  })

    it('should retrieve a job based on user', async () => {
      const res = await request(api).get('/jobs/user/1');
      expect(res.statusCode).toEqual(200);
      expect(res.body[0].user_id).toEqual(1);
    });

    it('should retrieve a job based on user on a spec. date', async () => {
      const res = await request(api).get('/jobs/user/1/2023-07-01');
      expect(res.statusCode).toEqual(200);
      expect(res.body[0]).toEqual({
        address: "12 Walton rd",
        description: "Description 1",
        endDate: "2023-07-02T23:59:59.000Z",
        hours_needed: 2,
        job_id: 1,
        num_volunteers: 2,
        start_dateTime: "2023-07-01T09:00:00.000Z",
        title: "Job 1",
        user_id: 1,
      });
    });

    it('should return sum of hours worked by user', async() =>{
      const res = await request(api).get('/jobs/hours/user/1');
      expect(res.statusCode).toEqual(200);
      expect(res.body[0]).toEqual();
    });
    
    it('should return an organisation contact details', async() =>{
      const res = await request(api).get('/jobs/contact/2');
      expect(res.statusCode).toEqual(200);
      expect(res.body[0]).toEqual({
        address: "1 Ave",
        email : "library@gmail.com",
        id: 2,
        name: "Library",
        phone_number: "12345"
      });
    });

  
    it('should create a new application', async () => {
      const newApplication = {
        job_id: 1,
        user_id: 1,
      };

      const res = await request(api).post('/applications/create').send(newApplication);

      expect(res.statusCode).toEqual(201);
      expect(res.body).toEqual({"application_id": 2, "job_id": 1, "user_id": 1});
    });


    it('should retrieve a user based on name', async () => {
      const res = await request(api).get('/jobs/hours/user/1')
      expect(res.statusCode).toEqual(200)
      //console.log(res.body);
      expect(res.body["Hours Worked"]).toContain("4")
    });
})