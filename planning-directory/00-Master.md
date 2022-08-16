# Minimal Viable Demo

- Only work on features we will be able to showcase in a 5 minute window
  - Such as Responsive Design

# 01 - User Stories

## Admins

- As an ADMIN I can POST an item because I want to sell my item
- As an ADMIN I can REMOVE an item because I do not want to sell it anymore
- As an ADMIN I can EDIT an item to show it as SOLD because as USER has bought it
- As an ADMIN I can MESSAGE a USER because I want to negotiate a price with the USER

## Users

- As a USER, I can GET featured items, because I want to see what's selling.
- As a USER, I can MESSAGE an admin because I want to buy what they're selling.
- As a USER, I can FAVOURITE items, because I want to check them out later.
- AS a USER, I can FILTER items because I want to look for specific items.

# 02 - Nouns

- Users
  - ID
  - name
  - username
  - password
- Admins
  - id
  - name
  - username
  - password
- messages
  - id
  - message
  - date_created
  - user_id
  - admin_id
  - card_id
- conversations
  - id
  - admin_id
  - user_id
    - 

- items (cards)
  - id
  - rarity
  - price
  - set
  - owner_id
  - date_added
  - sold
  - card_type
  - active
  - featured
  - image
  - description

# 03 ERD

# 04 - Routes
# ADMIN Routes
- GET /listings view all their listings.
- POST /listing/new post a new listings.
- POST /login/2 logs into the admin account.
- GET /conversations:1 view conversation with specific user.


B - GET
R - GET
E - POST
A - POST
D - POST

# 05 - Wireframe

- Everyone on the team should be able to implement the front-end
