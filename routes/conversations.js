const express = require("express");
const { getConversations } = require("../database");
const router = express.Router();

router.get("/", (req, res) => {
  getConversations().then((conversations) => {
    const templateVars = {
      conversations,
      userID: req.cookies.account,
    };
    res.render("conversations", templateVars);
  });
});
module.exports = router;
