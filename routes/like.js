const express = require("express");
const { likeCard, checkIfCardLiked, removeLike } = require("../database");
const router = express.Router();

router.post("/", (req, res) => {
  const cardID = parseInt(req.body.id);

  checkIfCardLiked(cardID).then((favoritesObject) => {
    const activeStatus = favoritesObject[0].active;

    if (activeStatus === false) {
      likeCard(cardID).then(()=> {
        res.json({success: true});
      })
    } else if (activeStatus === true) {
      removeLike(cardID).then(() => {
        res.json({success: true});
      })
    }

  });
});
module.exports = router;
