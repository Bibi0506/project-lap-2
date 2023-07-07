DROP TABLE IF EXISTS Applications;
DROP TABLE IF EXISTS token;
DROP TABLE IF EXISTS jobs;
DROP TABLE IF EXISTS Users;

CREATE TABLE Users(
    id INT GENERATED ALWAYS AS IDENTITY,
    is_organisation BOOLEAN NOT NULL,
    name VARCHAR(30) NOT NULL,
    email VARCHAR(40) NOT NULL UNIQUE,
    password VARCHAR(60) NOT NULL,
    phone_number BIGINT NOT NULL,
    address VARCHAR(50) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE jobs(
    job_id INT GENERATED ALWAYS AS IDENTITY,
    user_id INT NOT NULL,
    category VARCHAR(20) NOT NULL,
    title VARCHAR(35) NOT NULL,
    description VARCHAR(200) NOT NULL,
    start_dateTime TIMESTAMPTZ NOT NULL,
    endDate TIMESTAMPTZ NOT NULL,
    hours_needed INT NOT NULL,
    num_volunteers INT NOT NULL,
    PRIMARY KEY (job_id),
    FOREIGN KEY (user_id) REFERENCES Users(id)
);

CREATE TABLE Applications(
    application_id INT GENERATED ALWAYS AS IDENTITY,
    job_id  INT NOT NULL,
    user_id INT NOT NULL,
    PRIMARY KEY (application_id),
    FOREIGN KEY (job_id) REFERENCES jobs(job_id),
    FOREIGN KEY (user_id) REFERENCES Users(id)
);

CREATE TABLE token(
    token_id INT GENERATED ALWAYS AS IDENTITY,
    user_id INT NOT NULL,
    token CHAR(36) UNIQUE NOT NULL,
    is_organisation BOOLEAN NOT NULL,
    PRIMARY KEY (token_id),
    FOREIGN KEY (user_id) REFERENCES Users(id)
);

INSERT INTO Users (name, is_organisation, email, password, phone_number, address)
VALUES
('Oliver Thomas', false, 'ssdf@gmail.com', 'qwer', 12332, 'qweqwtg'),
('Dan Scott', false, 'dfbb@gmail.com', 'qwer', 12332, 'qweqwtg'),
('Roberta Capuano', false, 'tykjgj@gmail.com', 'qwer', 12332, 'qweqwtg'),
('Sabrina Wright', true, 'ttn@gmail.com', 'qwer', 12332, 'qweqwtg'),
('Library', true, 'esdfvsf@hotmail.com', 'sdfhe', 123546543, 'dsfbdv');

INSERT INTO jobs (user_id, category, title, description, start_dateTime, endDate, hours_needed, num_volunteers)
VALUES
(5, 'Customer Services', 'Library Assistant', 'You will be assisting the manager to re-organise the bookshelves', '2023-07-01T09:00:00.000Z', '2023-07-02T23:59:59.000Z', 2, 2),
(5, 'Customer Services', 'Library Assistant', 'You will be assisting the manager to re-organise the bookshelves', '2023-07-06T09:00:00.000Z', '2023-07-06T23:59:59.000Z', 2, 1),
(2, 'Gardener', 'Gardener Assistant', 'Trim trees and plant seeds', '2023-07-03T09:00:00.000Z', '2023-07-06T23:59:59.000Z', 2, 1),
(2, 'Gardener', 'Hedge Trimmer', 'Cut things', '2023-06-06T09:00:00.000Z', '2023-06-06T23:59:59.000Z', 2, 1),
(3, 'Litter picker', 'Litter picker', 'Pick up trash from around hospital', '2023-07-01T09:00:00.000Z', '2023-07-03T23:59:59.000Z', 2, 1),
(3, 'Litter picker', 'Litter picker' ,'Pick up trash from around sports centre.', '2023-07-01T09:00:00.000Z', '2023-07-03T23:59:59.000Z', 2, 1),
(4, 'Food Service', 'Server', 'Help at the local food bank serving food.', '2023-07-06T09:00:00.000Z', '2023-07-06T23:59:59.000Z', 2, 1),
(4, 'Drink Service', 'Server', 'Help at the local food bank serving drinks.', '2023-07-06T09:00:00.000Z', '2023-07-06T23:59:59.000Z', 2, 1),
(5, 'Customer Services', 'Library Assistant', 'You will be assisting the manager to re-organise the bookshelves', '2023-07-06T09:00:00.000Z', '2023-07-06T23:59:59.000Z', 2, 1);



INSERT INTO Applications (job_id, user_id) VALUES
(1, 1),
(1, 2)

