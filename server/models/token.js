// const { v4: uuidv4 } = require("uuid");

// const db = require("../db/connect");

// class Token {
//   constructor({ token_id, user_id, token, is_organisation }) {
//     this.token_id = token_id;
//     this.user_id = user_id;
//     this.token = token;
//     this.is_organisation = is_organisation;
//   }

//   static async create(id, is_organisation) {
//     //generate token & store it in the db
//     const token = uuidv4();
//     const response = await db.query(
//       "INSERT INTO token (user_id, token, is_organisation) VALUES ($1, $2, $3) RETURNING token_id;",
//       [id, token, is_organisation]
//     );
//     const newId = response.rows[0].token_id;
//     const newToken = await Token.getOneById(newId);
//     return newToken;
//   }

//   static async getOneById(id) {
//     const response = await db.query("SELECT * FROM token WHERE token_id = $1", [
//       id,
//     ]);
//     if (response.rows.length != 1) {
//       throw new Error("Unable to locate token.");
//     } else {
//       return new Token(response.rows[0]);
//     }
//   }

//   static async getOneByToken(token) {
//     const response = await db.query("SELECT * FROM token WHERE token = $1", [
//       token,
//     ]);
//     if (response.rows.length != 1) {
//       throw new Error("Unable to locate token.");
//     } else {
//       return new Token(response.rows[0]);
//     }
//   }
// }

// module.exports = Token;
