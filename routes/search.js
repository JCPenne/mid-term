const express = require("express");
const { getListedCardsForSearch, getSpecificCards } = require("../database");
const router = express.Router();

// Note: the "/" really means /search, this is specified in the server.js file where all the routes are mounted.
router.get("/", (req, res) => {
  getListedCardsForSearch(1).then((allCards) => {
    const templateVars = {
      allCards,
      userID: req.cookies.account,
    };
    res.render("search", templateVars);
  });
});
module.exports = router;

// When the user uses the search button.
router.post("/", (req, res) => {
  const userID = 2;

  // Grab the user's phrase that they want to search for.
  let userSearch = "%H%";
  userSearch = userSearch.replace("H", req.body.search);
  userSearch = userSearch.toUpperCase();

  // Grab the min and max prices the user types.
  let minPrice = req.body.min_price;
  let maxPrice = req.body.max_price;
  if (!minPrice) {
    minPrice = 0;
  }
  if (!maxPrice) {
    maxPrice = 999999;
  }
  const searchParams = [userSearch, minPrice, maxPrice];

  getSpecificCards(searchParams).then((allCards) => {
    const templateVars = {
      allCards,
      userID,
    };

    res.json(templateVars);
  });
});
module.exports = router;
