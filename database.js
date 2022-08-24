const { Pool } = require("pg");
const dbParams = require("./lib/db.js");
const db = new Pool(dbParams);
// db.connect();

exports.getFeaturedCards = function () {
  return db
    .query(
      `SELECT cards.id, cards.featured, favorites.user_id, favorites.active, cards.price, cards.name, cards.image_url
      FROM cards LEFT JOIN favorites ON cards.id = favorites.card_id
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

// ORIGINAL VERSION
// exports.getFeaturedCards = function () {
//   return db
//     .query(
//       `SELECT * FROM cards
//        WHERE featured = true`
//     )
//     .then((res) => {
//       console.log(res.rows);
//       return res.rows;
//     })
//     .catch((err) => {
//       console.log(err.message);
//     });
// };

exports.getListedCards = function (data) {
  return db
    .query(
      `SELECT cards.id, cards.featured, favorites.user_id, favorites.active, cards.price, cards.name, cards.image_url
      FROM cards LEFT JOIN favorites ON cards.id = favorites.card_id
      WHERE owner_id = $1`,
      [data]
    )
    .then((res) => {
      return res.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

// ORIGINAL VERSION
// exports.getListedCards = function (data) {
//   return db
//     .query(
//       `SELECT * FROM cards
//       WHERE owner_id = $1`,
//       [data]
//     )
//     .then((res) => {
//       return res.rows;
//     })
//     .catch((err) => {
//       console.log(err.message);
//     });
// };

exports.getFavoriteCards = function () {
  return db
    .query(
      `SELECT cards.id, cards.featured, favorites.user_id, favorites.active, cards.price, cards.name, cards.image_url
      FROM cards LEFT JOIN favorites ON cards.id = favorites.card_id
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

// ORIGINAL VERSION
// exports.getFavoriteCards = function () {
//   return db
//     .query(
//       `SELECT * FROM favorites
//       JOIN cards ON card_id = cards.id
//       WHERE favorites.active = true`
//     )
//     .then((res) => {
//       console.log(res.rows);
//       return res.rows;
//     })
//     .catch((err) => {
//       console.log(err.message);
//     });
// };

exports.getSpecificCards = function (searchParams) {
  return db
    .query(
      `SELECT cards.id, cards.featured, favorites.user_id, favorites.active, cards.price, cards.name, cards.image_url
      FROM cards LEFT JOIN favorites ON cards.id = favorites.card_id
      WHERE upper(cards.name) LIKE $1
      AND cards.price >= $2
      AND cards.price <= $3`,
      [searchParams[0], searchParams[1], searchParams[2]]
    )
    .then((res) => {
      console.log(res.rows);
      return res.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

// ORIGINAL VERSION
// exports.getSpecificCards = function (searchParams) {
//   return db
//     .query(
//       `SELECT * FROM cards
//       WHERE upper(name) LIKE $1
//       AND price >= $2
//       AND price <= $3`,
//       [searchParams[0], searchParams[1], searchParams[2]]
//     )
//     .then((res) => {
//       console.log(res.rows);
//       return res.rows;
//     })
//     .catch((err) => {
//       console.log(err.message);
//     });
// };

exports.getConversations = function (search) {
  return db
    .query(
    `SELECT conversations.id as id,
    cards.name as card_name,
    users.name as name
    FROM conversations
    JOIN messages ON conversations.id = messages.conversation_id
    JOIN users ON messages.sender_id = users.id
    JOIN cards ON conversations.card_id = cards.id
    WHERE messages.receiver_id = 1
    GROUP BY conversations.id, users.name, cards.name;
    `)
    .then((res) => {
      console.log(res.rows);
      return res.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

exports.newListing = function (data) {
  return db
    .query(
      `INSERT INTO cards (name,price,image_url,owner_id)
      VALUES ($1,$2,$3,$4)`,
      [data.name, data.price, data.url, data.owner_id]
    )
    .then(() => {
      return db.query(
        `SELECT * from cards
      WHERE owner_id = $1`,
        [data.owner_id]
      );
    })
    .then((table) => {
      return table.rows;
    });
};

exports.markAsSold = (data) => {
  return db
    .query(
      `UPDATE cards
      SET sold = TRUE
      WHERE cards.id = $1`,
      [data.cardID]
    )
    .then(() => {
      return db.query(
        `SELECT * from cards
      WHERE owner_id = $1`,
        [data.userID]
      );
    })
    .then((table) => {
      return table.rows;
    });
};

exports.likeCard = (cardID) => {
  console.log("cardID:" + cardID);
  return db
    .query(
      `UPDATE favorites
      SET active = true
      WHERE card_id = $1`,
      [cardID]
    )
    .then((res) => {
      return res.rows;
    });
};

exports.checkIfCardLiked = (cardID) => {
  console.log("cardID:" + cardID);
  return db
    .query(
      `SELECT * FROM favorites
      WHERE card_id = $1`,
      [cardID]
    )
    .then((res) => {
      return res.rows;
    });
};

exports.removeLike = (cardID) => {
  console.log("cardID:" + cardID);
  return db
    .query(
      `UPDATE favorites
      SET active = false
      WHERE card_id = $1`,
      [cardID]
    )
    .then((res) => {
      return res.rows;
    });
};
