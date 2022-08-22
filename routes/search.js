const express = require("express");
const { getListedCards, getSpecificCards } = require("../database");
const router = express.Router();


// Note: the "/" really means /search, this is specified in the server.js file where all the routes are mounted.
router.get("/", (req, res) => {
  const userID = 2
  getListedCards(2).then((allCards) => {
    const templateVars = {
      allCards,
      userID
    };
    console.log(allCards);
    res.render("search", templateVars);
  });
});
module.exports = router;

// When the user uses the search button.
router.post("/", (req, res) => {
  const userID = 2;
  let userSearch = '%H%';
  userSearch = userSearch.replace("H", req.body.search);

  userSearch = userSearch.toUpperCase();

  getSpecificCards(userSearch).then((allCards) => {
    console.log("ALL CARDS: " + allCards);
    const templateVars = {
      allCards,
      userID
    };

    res.render("search", templateVars);
  })
});
module.exports = router;
