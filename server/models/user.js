const db = require('../db/connect');

class User {

    constructor({ user_id, username, password, is_admin }) {
        this.id = user_id;
        this.username = username;
        this.password = password;
        this.isAdmin = is_admin;
    }//implement all the details that are not null from the table

    //gets users by ID
    static async getOneById(id) {
        const response = await db.query("SELECT * FROM users WHERE user_id = $1", [id]);
        if (response.rows.length != 1) {
            throw new Error("Unable to locate user.");
        }
        return new User(response.rows[0]);
    }

    //gets user by user name 
    static async getOneByUsername(username) {
        const response = await db.query("SELECT * FROM users WHERE username = $1", [username]);
        if (response.rows.length != 1) {
            throw new Error("Unable to locate user.");
        }
        return new User(response.rows[0]);
    }
    
    //new user in the db
    static async create(data) {
        const { username, password, isAdmin } = data;
        let response = await db.query("INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id;",
            [username, password]);
        const newId = response.rows[0].user_id;
        const newUser = await User.getOneById(newId);
        return newUser;
    }
}

module.exports = User;