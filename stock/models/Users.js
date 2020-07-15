const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  userName: String,
  balance: { type: Number, default: 10000 },
  googleId: String,
});

mongoose.model("user", userSchema);
//we dont export anything since all we are doing is creating a model class
//on mongo. All we need to do is import this file in index so it can run.
