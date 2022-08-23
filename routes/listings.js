const express = require("express");
const { getListedCards, newListing, markAsSold } = require("../database");
const router = express.Router();

router.get("/", (req, res) => {
  getListedCards(req.cookies.account).then((listedCards) => {
    const templateVars = {
      listedCards,
      userID: req.cookies.account,
    };
    res.render("listings", templateVars);
  });
});

router.post("/json", (req, res) => {
  newListing({
    name: req.body["card-name"],
    price: req.body.price,
    url: req.body.url,
    owner_id: req.cookies.account,
  }).then((data) => {
    res.json(data);
  });
});

router.post("/sold/:id", (req, res) => {
  console.log(req.params);
  markAsSold({
    cardID: req.params.id,
    userID: req.cookies.account,
  }).then((data) => {
    res.json(data);
  });
});

module.exports = router;
