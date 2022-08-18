const express = require("express");
const { getListedCards } = require("../database");
const router = express.Router();

router.get("/", (req, res) => {
  console.log(req);
  getListedCards().then((listedCards) => {
    const templateVars = {
      listedCards,
    };
    res.render("listings", templateVars);
  });
});
module.exports = router;
