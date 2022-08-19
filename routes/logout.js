const express = require("express");
const { getFeaturedCards } = require("../database");
const router = express.Router();
var cookieParser = require("cookie-parser");

// Note: the "/" really means /user, this is specified in the server.js file where all the routes are mounted.
router.get("/", (req, res) => {
  console.log("LOGOUT IS CONNECTED");
  res.clearCookie("account");

  //////////////////////////////////////////////// This code is just for testing purposes and will be removed later.
  getFeaturedCards().then((featuredCards) => {
    const templateVars = {featuredCards};
    res.render("landing", templateVars);
  });
  ////////////////////////////////////////////////
});
module.exports = router;
