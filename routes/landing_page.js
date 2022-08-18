const express = require("express");
const { getFeaturedCards } = require("../database");
const router = express.Router();

module.exports = () => {
  router.get("/", (req, res) => {
    const featuredCards = getFeaturedCards();
    const templateVars = {
      featuredCards,
    };

    res.render("landing", templateVars);
  });
  return router;
};
