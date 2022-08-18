const { Pool } = require("pg");
const dbParams = require("./lib/db.js");
const db = new Pool(dbParams);
db.connect();

exports.getFeaturedCards = () => {
  return db
    .query(
      `SELECT * from cards
       WHERE featured = true`
    )
    .then((res) => {
      return res.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};
