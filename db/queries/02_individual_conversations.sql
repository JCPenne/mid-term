SELECT *
from conversations
JOIN messages ON conversations.id = messages.conversation_id
WHERE sender_id = $1
OR receiver_id = $1
[]
