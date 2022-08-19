const express = require("express");
const { getListedCards, getSpecificCards } = require("../database");
const router = express.Router();


// Note: the "/" really means /search, this is specified in the server.js file where all the routes are mounted.
router.get("/", (req, res) => {
  const userID = 2
  getListedCards().then((allCards) => {
    const templateVars = {
      allCards,
      userID
    };
    res.render("search", templateVars);
  });
});
module.exports = router;

// When the user uses the search button.
router.post("/", (req, res) => {
  console.log(req.body.search);
  getSelection(req.body.search).then(() => {
    const templateVars = {
      allCards
    };
  })
});
module.exports = router;
