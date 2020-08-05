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
  let newBalance = balance - amount;
  const user = await User.findOneAndUpdate(
    { _id: req.user.id },
    {
      balance: newBalance,
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
  res.send(user);
});

if (process.env.NODE_ENV === "production") {
  //express will serve up production assets in the client build such as main.js
  app.use(express.static("client/build"));
  //express will serve index.html if it doesnt recognize the route
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(process.env.PORT || 5000);
