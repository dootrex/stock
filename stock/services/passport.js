const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require("../config/keys");
const mongoose = require("mongoose");
const User = mongoose.model("user");

passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser((id, done) => {
  //accesing user from mongodb as User is assigned up
  User.findById(id).then((user) => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientId,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
      proxy: true,
    },
    async (accessToken, refreshToken, profile, done) => {
      //this is creating a model instance and then saving it to DB
      const existingUser = await User.findOne({
        googleId: profile.id,
      });
      if (existingUser) {
        //there is a user with this id
        done(null, existingUser);
      } else {
        //lets make a new user
        const user = await new User({
          googleId: profile.id,
          userName: profile.displayName,
        }).save();
        done(null, user); //the user in this instance is the freshest
      }
    }
  )
);
