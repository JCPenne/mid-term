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
      `SELECT * FROM cards
      WHERE sold = false`
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
      JOIN cards ON card_id = cards.id
      WHERE favorites.active = true`
    )
    .then((res) => {
      console.log(res.rows);
      return res.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

// Still in progress.
exports.getSpecificCards = function (search) {
  return db
    .query(
      `SELECT * FROM cards
      WHERE name LIKE "%$1%"`
    )
    .then((res) => {
      console.log(res.rows);
      return res.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

exports.getConversations = function (search) {
  return db
    .query(
      `SELECT * FROM conversations`
    )
    .then((res) => {
      console.log(res.rows);
      return res.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};
