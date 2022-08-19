const express = require("express");
const { getListedCards } = require("../database");
const router = express.Router();

router.get("/", (req, res) => {
  console.log(req);
  const userID = 1;
  getListedCards().then((listedCards) => {
    const templateVars = {
      listedCards,
      userID,
    };
    res.render("listings", templateVars);
  });
});
module.exports = router;
