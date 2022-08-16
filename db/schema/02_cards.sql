DROP TABLE IF EXISTS cards CASCADE;

CREATE TABLE cards (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  price INT NOT NULL DEFAULT 0,
  image_url TEXT,
  description TEXT,
  date_added DATE,
  sold BOOLEAN DEFAULT false,
  active BOOLEAN DEFAULT true,
  featured BOOLEAN DEFAULT false,
  owner_id INTEGER REFERENCES users(id) ON DELETE CASCADE
  -- rarity INT(5) NOT NULL DEFAULT 0,
  -- set TEXT NOT NULL DEFAULT 'N/A',
  -- type TEXT NOT NULL DEFAULT 'N/A',
);
