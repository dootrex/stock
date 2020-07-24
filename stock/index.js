const express = require("express");
const passport = require("passport");
const mongoose = require("mongoose");
const app = express();
const cookieSession = require("cookie-session");
const bodyParser = require("body-parser");

require("./models/Users");
require("./services/passport");
const keys = require("./config/keys");
const requireLogin = require("./middleware/requireLogin");

mongoose.connect(keys.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const User = mongoose.model("user");

app.use(bodyParser.json());
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

app.get("/api/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("/simulator");
  }
);

app.post("/api/stock", requireLogin, async (req, res) => {
  let { ticker, quantity, price, balance, stockName } = req.body;
  const amount = quantity * price;
  balance = balance - amount;
  console.log(balance);
  const user = await User.findOneAndUpdate(
    { _id: req.user.id },
    {
      balance: balance,
      $push: {
        stocks: {
          ticker: ticker,
          quantity: quantity,
          amount: amount,
          stockName: stockName,
        },
      },
    },
    { new: true }
  ).exec();
  console.log(user.stocks[0].quantity);
  res.send(user);
});

app.post("/api/stock/remove", requireLogin, async (req, res) => {
  console.log(req.body.ticker);
  console.log(req.body.newBalance);
  const user = await User.findOneAndUpdate(
    { _id: req.user.id },
    {
      balance: req.body.newBalance,
      $pull: { stocks: { ticker: req.body.ticker } },
    },
    { new: true }
  ).exec();
  res.send(req.user);
});

app.listen(5000);
