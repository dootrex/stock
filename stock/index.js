const express = require("express");
const passport = require("passport");
const mongoose = require("mongoose");
const app = express();
const cookieSession = require("cookie-session");

require("./models/Users");
require("./services/passport");
const keys = require("./config/keys");

mongoose.connect(keys.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey],
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.get("/api/current_user", (req, res) => {
  res.send(req.user);
});

app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    res.send("You are logged in as " + req.user);
  }
);

app.listen(5000);
