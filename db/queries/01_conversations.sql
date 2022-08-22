SELECT conversations.id as id,
messages.sender_id as sender,
messages.receiver_id as receiver,
users.name as name
FROM conversations
JOIN messages ON conversations.id = messages.conversation_id
JOIN users ON messages.sender_id = users.id
WHERE messages.receiver_id = 1
GROUP BY conversations.id, sender, receiver, name;
