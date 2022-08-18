const express = require("express");
const { getListedCards } = require("../database");
const router = express.Router();


// Note: the "/" really means /search, this is specified in the server.js file where all the routes are mounted.
router.get("/", (req, res) => {

  getListedCards().then((allCards) => {
    const templateVars = {
      allCards,
    };
    res.render("search", templateVars);
  });
});
module.exports = router;
