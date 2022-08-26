const express = require("express");
const { getFeaturedCards, createNewConversation } = require("../database");
const router = express.Router();
var cookieParser = require("cookie-parser");

// Note: the "/" really means /user, this is specified in the server.js file where all the routes are mounted.
router.get("/", (req, res) => {
  res.cookie("account", 2);

  getFeaturedCards().then((featuredCards) => {
    const templateVars = {
      featuredCards,
      userID: 2,
    };
    console.log(templateVars);
    res.render("user_homepage", templateVars);
  });
});

router.get("/contact/:id", (req, res) => {
  createNewConversation(req.params);
  res.redirect("/conversations");
});

module.exports = router;
