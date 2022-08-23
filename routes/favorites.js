const express = require("express");
const { getFavoriteCards } = require("../database");
const router = express.Router();

router.get("/", (req, res) => {
  getFavoriteCards().then((favoriteCards) => {
    const templateVars = {
      favoriteCards,
      userID: req.cookies.account,
    };
    res.render("favorites", templateVars);
  });
});
module.exports = router;
