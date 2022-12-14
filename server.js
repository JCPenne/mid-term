// load .env data into process.env
require("dotenv").config();

// Web server config
const PORT = process.env.PORT || 8080;
const sassMiddleware = require("./lib/sass-middleware");
const express = require("express");
const app = express();
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

const {
  database,
  getFeaturedCards,
  getListedCards,
  getFavoriteCards,
  getConversations
} = require("./database");

// PG database client/connection setup
// const { Pool } = require("pg");
// const dbParams = require("./lib/db.js");
// const db = new Pool(dbParams);
// db.connect();

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
// The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan("dev"));

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.use(
  "/styles",
  sassMiddleware({
    source: __dirname + "/styles",
    destination: __dirname + "/public/styles",
    isSass: false, // false => scss, true => sass
  })
);

app.use(express.static("public"));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
// const usersRoutes = require("./routes/users");
// const widgetsRoutes = require("./routes/widgets");
const landing_page = require("./routes/landing_page");
const admin_login = require("./routes/admin_login");
const user_login = require("./routes/user_login");
const listings = require("./routes/listings");
const favorites = require("./routes/favorites");
const conversations = require("./routes/conversations");
const search = require("./routes/search");
const logout = require("./routes/logout");
const like = require("./routes/like");

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
// app.use("/api/widgets", widgetsRoutes(db));
app.use(cookieParser());
app.use("/", landing_page);
app.use("/admin", admin_login);
app.use("/user", user_login);
app.use("/listings", listings);
app.use("/favorites", favorites);
app.use("/conversations", conversations);
app.use("/search", search);
app.use("/logout", logout);
app.use("/like", like);

// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
