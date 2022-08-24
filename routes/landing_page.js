const express = require("express");
const { getFeaturedCards } = require("../database");
const router = express.Router();

router.get("/", (req, res) => {
  getFeaturedCards().then((featuredCards) => {
    console.log(featuredCards);
    const templateVars = {
      featuredCards,
    };
    res.render("landing", templateVars);
  });
});
module.exports = router;
