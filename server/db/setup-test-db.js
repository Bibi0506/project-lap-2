//Test database environment 
require("dotenv").config();
const db = require ('./connect');


//create the "Users" table in the test database
const createDbEnv = async () => {
    await db.query(`
    CREATE TABLE Users (
        id INT GENERATED ALWAYS AS IDENTITY,
        is_organisation BOOLEAN NOT NULL,
        name VARCHAR(30) NOT NULL,
        email VARCHAR(40) NOT NULL UNIQUE,
        password VARCHAR(60) NOT NULL,
        phone_number BIGINT NOT NULL,
        address VARCHAR(50) NOT NULL,
        PRIMARY KEY (id)
      );
  
      CREATE TABLE jobs (
        job_id INT GENERATED ALWAYS AS IDENTITY,
        user_id INT NOT NULL,
        category_id INT NOT NULL,
        title VARCHAR(35) NOT NULL,
        description VARCHAR(200) NOT NULL,
        start_dateTime TIMESTAMPTZ NOT NULL,
        endDate TIMESTAMPTZ NOT NULL,
        hours_needed INT NOT NULL,
        num_volunteers INT NOT NULL,
        PRIMARY KEY (job_id),
        FOREIGN KEY (user_id) REFERENCES Users (id)
      );
  
      CREATE TABLE Applications (
        application_id INT GENERATED ALWAYS AS IDENTITY,
        job_id INT NOT NULL,
        user_id INT NOT NULL,
        PRIMARY KEY (application_id),
        FOREIGN KEY (job_id) REFERENCES Jobs (job_id),
        FOREIGN KEY (user_id) REFERENCES Users (id)
      );
  
      CREATE TABLE token (
        token_id INT GENERATED ALWAYS AS IDENTITY,
        user_id INT NOT NULL,
        token CHAR(6) UNIQUE NOT NULL,
        is_organisation BOOLEAN NOT NULL,
        PRIMARY KEY (token_id),
        FOREIGN KEY (user_id) REFERENCES Users (id)
      );
    `);
  };

    //populates the "Users" table in the test database with some initial data
    const populateDbEnv = async () => {
        await db.query("INSERT INTO Users  (name, is_organisation, email, password, phone_number, address) VALUES ('Mike', FALSE, 'mike@gmail.com', 'hello', 12345, '12 Walton rd')");
        
        await db.query("INSERT INTO Users  (name, is_organisation, email, password, phone_number, address) VALUES ('Library', TRUE, 'library@gmail.com', 'hello', 12345, '1 Ave')");

        await db.query("INSERT INTO jobs (user_id, category_id, title, description, start_dateTime, endDate, hours_needed, num_volunteers) VALUES (1, 1, 'Job 1', 'Description 1', '2023-07-01T09:00:00.000Z', '2023-07-02T23:59:59.000Z', 2, 2)");

        await db.query("INSERT INTO Applications (job_id, user_id) VALUES (1, 1)");
      
        await db.query("INSERT INTO token (user_id, token, is_organisation) VALUES (1, 'tok123', FALSE)");
      }; 
    
    
    //cleaning up the test environment by dropping the "Users" table from the test database.
    const destroyDbEnv = async () => {
        await db.query(`
        DROP TABLE IF EXISTS Applications;
        DROP TABLE IF EXISTS jobs;
        DROP TABLE IF EXISTS token;
        DROP TABLE IF EXISTS Users;`)
    };
    
    module.exports = { createDbEnv, populateDbEnv, destroyDbEnv };