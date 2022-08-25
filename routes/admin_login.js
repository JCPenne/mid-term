const express = require("express");
const { getFeaturedCards } = require("../database");
const router = express.Router();

// Note: the "/" really means /admin, this is specified in the server.js file where all the routes are mounted.
router.get("/", (req, res) => {
  res.cookie("account", 1);

  getFeaturedCards().then((featuredCards) => {
    const templateVars = {
      featuredCards,
      userID: 1,
    };
    res.render("admin_homepage", templateVars);
  });
});
module.exports = router;
