const db = require('../db/connect');

class User {

    constructor({ id, is_organisation, name, email, password, phone_number, address}) {
        this.id = id,
        this.is_organisation = is_organisation,
        this.name = name,
        this.email = email,
        this.password = password,
        this.phone_number = phone_number,
        this.address = address
    }//implement all the details that are not null from the table

    //gets users by ID
    static async getOneById(id) {
        const response = await db.query("SELECT * FROM Users WHERE id = $1", [id]);
        if (response.rows.length != 1) {
            throw new Error("Unable to locate user.");
        }
        return new User(response.rows[0]);
    }

    //gets user by user name/email 
    static async getOneByUsername(email) {
        const response = await db.query("SELECT * FROM Users WHERE email = $1", [email]);
        console.log(response.rows);
        if (response.rows.length != 1) {
            throw new Error("Unable to locate user.");
        }
        return new User(response.rows[0]);
    }
    
    //new user in the db
    static async create(data) {
        const {is_organisation, name, email, password, phone_number, address } = data;

        let response = await db.query("INSERT INTO Users (is_organisation, name, email, password, phone_number, address) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id;",
            [is_organisation, name, email, password, phone_number, address]);
        const newId = response.rows[0].id;

        const newUser = await User.getOneById(newId);
        return newUser;
    }
}

module.exports = User;