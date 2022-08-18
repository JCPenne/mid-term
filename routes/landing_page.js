const express = require("express");
const { getFeaturedCards } = require("../database");
const router = express.Router();

router.get("/", (req, res) => {
  // console.log(req);
  getFeaturedCards().then((featuredCards) => {
    const templateVars = {
      featuredCards,
    };
    res.render("landing", templateVars);
  });
});
module.exports = router;
