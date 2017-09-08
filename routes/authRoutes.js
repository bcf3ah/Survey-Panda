const express = require("express");
const passport = require("passport");
const router = express.Router();

//route handler for Google OAuth login
router.get("/auth/google", passport.authenticate('google', {
  scope: ['profile', 'email']
}));

//route handler for Google OAuth callback with OAuth code now in the url params. Passport strategy will handle it
router.get("/auth/google/callback", passport.authenticate('google'));

//route handler to log out
router.get('/auth/logout', (req, res) => {
  req.logout();
  res.send(req.user);
});

//test route to see req.User
router.get('/currentUser', (req, res) => {
  res.send({
    User: req.user
  });
});

module.exports = router;
