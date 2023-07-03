DROP TABLE IF EXISTS volunteerUsers;
DROP TABLE IF EXISTS jobs;
DROP TABLE IF EXISTS organisations;

CREATE TABLE volunteerUsers(
    volunteer_id INT GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(30) NOT NULL,
    email VARCHAR(40) NOT NULL,
    password VARCHAR(20) NOT NULL,
    phone_number INT NOT NULL,
    address VARCHAR(50) NOT NULL,
    PRIMARY KEY (volunteer_id)
);

CREATE TABLE organisations(
    organisation_id INT GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(30) NOT NULL,
    email VARCHAR(40) NOT NULL,
    password VARCHAR(20) NOT NULL,
    phone_number INT NOT NULL,
    address VARCHAR(50) NOT NULL,
    PRIMARY KEY (organisation_id)
);

CREATE TABLE jobs(
    job_id INT GENERATED ALWAYS AS IDENTITY,
    organisation_id INT,
    category VARCHAR(20) NOT NULL,
    title VARCHAR(35) NOT NULL,
    description VARCHAR(200) NOT NULL,
    start_dateTime TIMESTAMP NOT NULL,
    endDate DATE NOT NULL,
    hours_needed INT NOT NULL,
    num_volunteers INT NOT NULL,
    volunteers INT ARRAY,
    PRIMARY KEY (job_id),
    FOREIGN KEY (organisation_id) REFERENCES organisations(organisation_id)
    /*FOREIGN KEY (volunteers) REFERENCES volunteers(volunteer_id)*/
);

INSERT INTO volunteerUsers (name, email, password, phone_number, address)
VALUES
('Oliver Thomas', 'ssdf@gmail.com', 'qwer', 12332, 'qweqwtg'),
('Dan Scott', 'dfbb@gmail.com', 'qwer', 12332, 'qweqwtg'),
('Roberta Capuano', 'tykjgj@gmail.com', 'qwer', 12332, 'qweqwtg'),
('Sabrina Wright', 'ttn@gmail.com', 'qwer', 12332, 'qweqwtg');

INSERT INTO organisations (name, email, password, phone_number, address)
VALUES
('Library', 'esdfvsf@hotmail.com', 'sdfhe', 123546543, 'dsfbdv');

INSERT INTO jobs (organisation_id, category, title, description, start_dateTime, endDate, hours_needed, num_volunteers)
VALUES
(1, 'Customer Services', 'Library Assistant', 'You will be assisting the manager to re-organise the bookshelves', '2023-07-01 09:00:00', '2023-07-02', 2, 2);