const express = require("express");
const { getConversations, getAllMessages } = require("../database");
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

router.get("/:id", (req, res) => {
  console.log(`get request from /:id`, req.params);
  getAllMessages({
    id: req.params.id,
  }).then((data) => {
    res.json(data);
  });
});
