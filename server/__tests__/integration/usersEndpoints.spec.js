const { createDbEnv, populateDbEnv, destroyDbEnv } = require('../../db/setup-test-db')
const app = require('../../app');
const request = require('supertest');
//const { token } = require('morgan');


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

  /*it('should generate a new token', async () => {
    const newUserToken = {
      user_id: 1,
      token: 'abc123',
      is_organisation: false,
    };

    const res = await request(api).post('/users/login').send(newUserToken);
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("token");
  });*/

  
}); 