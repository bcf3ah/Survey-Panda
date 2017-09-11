const express = require("express");
const passport = require("passport");
const router = express.Router();

//route handler for Google OAuth login
router.get("/auth/google", passport.authenticate('google', {
  scope: ['profile', 'email'],
  prompt: 'select_account'
}));

//route handler for Google OAuth callback with OAuth code now in the url params. Passport strategy will handle it, then we redirect
router.get("/auth/google/callback", passport.authenticate('google'), (req, res) => {
  res.redirect("/surveys");
});

//route handler to log out
router.get('/api/logout', (req, res) => {
  req.logout();
  res.redirect("/");
});

//test route to see req.User
router.get('/api/current_user', (req, res) => {
  res.send(req.user);
});

module.exports = router;
