const express = require("express");
const { likeCard } = require("../database");
const router = express.Router();

router.post("/", (req, res) => {
  const cardID = parseInt(req.body.id);
  console.log("like.js: " + cardID);
  likeCard(cardID).then(()=> {
    res.json({success: true});
  })
});
module.exports = router;
