const { Pool } = require("pg");
const dbParams = require("./lib/db.js");
const db = new Pool(dbParams);
// db.connect();

exports.getFeaturedCards = function () {
  return db
    .query(
      `SELECT * FROM cards
       WHERE featured = true`
    )
    .then((res) => {
      console.log(res.rows);
      return res.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

exports.getListedCards = function () {
  return db
    .query(
      `SELECT * FROM cards`
    )
    .then((res) => {
      console.log(res.rows);
      return res.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

exports.getFavoriteCards = function () {
  return db
    .query(
      `SELECT * FROM favorites
      JOIN cards ON card_id = cards.id`
    )
    .then((res) => {
      console.log(res.rows);
      return res.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};
