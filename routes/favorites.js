const express = require("express");
const { getFavoriteCards } = require("../database");
const router = express.Router();

router.get("/", (req, res) => {
  const userID = 2;
  getFavoriteCards().then((favoriteCards) => {
    const templateVars = {
      favoriteCards,
      userID
    };
    res.render("favorites", templateVars);
  });
});
module.exports = router;
