const express = require("express");
const { getConversations, getMessages } = require("../database");
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

router.get("/", (req, res) => {
  getMessages().then((messages) => {
    const templateVars = {
      messages,
      userID: req.cookies.account,
    };
    res.render("conversations", templateVars);
  });
});
module.exports = router;
