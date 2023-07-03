//Note: These tests are testing using the mock data supplied when 'npm run setup-db' is run.
// Therefore the aforementioned command must be run before running these tests.


const request = require("supertest");
const app = require("../app");

describe('api server', () => {
    let api;

    beforeAll(() => {
        api = app.listen(5000, () => { //test port must be different to production port
            console.log('Test server running on port 5000');
        })
    })

    afterAll((done) => {
        console.log("Gracefully stopping test server");
        api.close(done);
    })

    test("first route responds with status code 200", (done) => {
        request(api)
            .get("/jobs/getall")
            .expect(200, done)
            //.end(function(err, res) {
            //    if (err) throw err;
            //    console.log(res.body);
          //})
            
    })


})

