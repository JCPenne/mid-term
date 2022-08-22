SELECT conversations.id as id,
cards.name as card_name,
users.name as name
FROM conversations
JOIN messages ON conversations.id = messages.conversation_id
JOIN users ON messages.sender_id = users.id
JOIN cards ON conversations.card_id = cards.id
WHERE messages.receiver_id = 1
GROUP BY conversations.id, users.name, cards.name;
