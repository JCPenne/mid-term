const express = require("express");
const { getFeaturedCards } = require("../database");
const router = express.Router();


// Note: the "/" really means /search, this is specified in the server.js file where all the routes are mounted.
router.get("/", (req, res) => {
  res.render("search");
});
module.exports = router;
