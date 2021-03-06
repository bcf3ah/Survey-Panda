const passport = require('passport');
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");

//Project Files
const User = mongoose.model("User");
const keys = require("../config/keys");

//Upon login/registration, passport will create a cookie using the MONGO user id, not googleId, and send it to the browser. This is the purpose of serializeUser
passport.serializeUser((user, done) => {
  done(null, user.id);
});

//Upon future requests from client, we'll check any cookies sent and desiralize them, meaning passport will see if the deserilized cookie matches a user id in Mongo, and if so, we'll set that user as req.user
passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  }).catch(error => done(error, null));
});

//Tell Passport to use Google OAuth20 Strategy
passport.use(new GoogleStrategy({
  clientID: keys.googleClientID,
  clientSecret: keys.googleClientSecret,
  callbackURL: '/auth/google/callback',
  proxy: true //for Heroku's proxy
},
async (accessToken, refreshToken, {id, displayName}, done) => {
  //check if profile.id is in our db. If not, create new user and send client a cookie. If yes, just send them a cookie.
  const existingUser = await User.findOne({googleId: id});

  if(existingUser){
    return done(null, existingUser);
  }

  const newUser = await new User({googleId: id, name: displayName}).save();
  done(null, newUser);
}));
