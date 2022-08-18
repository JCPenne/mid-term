const express = require("express");
const { getFavoriteCards } = require("../database");
const router = express.Router();

router.get("/", (req, res) => {
  console.log(req);
  getFavoriteCards().then((favoriteCards) => {
    const templateVars = {
      favoriteCards,
    };
    res.render("favorites", templateVars);
  });
});
module.exports = router;
