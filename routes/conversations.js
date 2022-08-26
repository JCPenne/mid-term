const express = require("express");
const { getConversations, getAllMessages, sendMessage } = require("../database");
const router = express.Router();

router.get("/", (req, res) => {
  const currentUserID = req.cookies.account;
  getConversations(currentUserID).then((conversations) => {
    const templateVars = {
      conversations,
      userID: currentUserID,
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

router.post("/json", (req, res) => {
  console.log(`post request from /`, req.body);
  sendMessage({
    message: req.body.message,
    sender_id: req.cookies.account,
    receiver_id: req.body.receiver_id,
    conversation_id: req.body.conversation_id,
  }).then((data) => {
    res.json(data);
  });
});
