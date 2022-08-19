const express = require("express");
const { getConversations } = require("../database");
const router = express.Router();

router.get("/", (req, res) => {
  console.log(req);
  const userID = 1;
  getConversations().then((conversations) => {
    const templateVars = {
      conversations,
      userID,
    };
    res.render("conversations", templateVars);
  });
});
module.exports = router;
