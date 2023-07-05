const { createDbEnv, populateDbEnv, destroyDbEnv } = require('../../database/setup-test-db')

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
    api = app.listen(5002, () => console.log('Test server running on port 5000'))
  });
  

  afterAll(async () => {
    console.log('Gracefully stopping test server')
    await api.close()
  })

  it('should retrieve a user based on name', async () => {
    const res = await request(api).get('/users/1')
    expect(res.statusCode).toEqual(200)
    expect(res.body.name).toEqual('Mike')
  });

})

/* ------------------------------------------------------------------------*/

describe('jobs endpoints', () => {
    let api;
  
    beforeEach(async () => {
      await createDbEnv();
      await populateDbEnv();
    });
  
    afterEach(async () => {
      await destroyDbEnv();
    });
  
    beforeAll(async () => {
      api = app.listen(5002, () => console.log('Test server running on port 5000'));
    });
  
    afterAll(async () => {
      console.log('Gracefully stopping test server');
      await api.close();
    });
  
    it('should retrieve a job based on ID', async () => {
      const res = await request(api).get('/jobs/1');
      expect(res.statusCode).toEqual(200);
      expect(res.body.title).toEqual('Job 1');
    });
  
    // Add more tests for other job-related endpoints?
  });
  /* ------------------------------------------------------------------------*/

  describe('tokens endpoints', () => {
    let api;
  
    beforeEach(async () => {
      await createDbEnv();
      await populateDbEnv();
    });
  
    afterEach(async () => {
      await destroyDbEnv();
    });
  
    beforeAll(async () => {
      api = app.listen(5002, () => console.log('Test server running on port 5000'));
    });
  
    afterAll(async () => {
      console.log('Gracefully stopping test server');
      await api.close();
    });
  
    it('should generate a new token', async () => {
      const newUserToken = {
        user_id: 1,
        token: 'abc123',
        is_organisation: false,
      };
  
      const res = await request(api).post('/tokens').send(newUserToken);
      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty('token_id');
    });
  
  });


  /* ------------------------------------------------------------------------*/

  describe('applications endpoints', () => {
    let api;
  
    beforeEach(async () => {
      await createDbEnv();
      await populateDbEnv();
    });
  
    afterEach(async () => {
      await destroyDbEnv();
    });
  
    beforeAll(async () => {
      api = app.listen(5002, () => console.log('Test server running on port 5000'));
    });
  
    afterAll(async () => {
      console.log('Gracefully stopping test server');
      await api.close();
    });
  
    it('should create a new application', async () => {
      const newApplication = {
        job_id: 1,
        user_id: 1,
      };
  
      const res = await request(api).post('/applications').send(newApplication);
      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty('application_id');
    });
  
  });



