const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const cookieSession = require("cookie-session");
const bodyParser = require("body-parser");
const path = require('path');

//Project Files
const keys = require('./config/keys');
require("./models/User"); //execute initializiation of mongo User and Survey classes here so we don't have to require it in other places, which can throw errors in testing environments.
require("./models/Survey");
const authRoutes = require('./routes/authRoutes');
const stripeRoutes = require('./routes/stripeRoutes');
const surveyRoutes = require("./routes/surveyRoutes");

//Import passport service for execution
require("./services/passport");

//Initiate Express app
const app = express();

//Use bodyparser
app.use(bodyParser.json());

//Tell passport we're using cookie sessions for authentication
app.use(cookieSession({
  maxAge: 30*24*60*60*1000,
  keys: [keys.cookieKey]
}));
app.use(passport.initialize());
app.use(passport.session());

//Connect to mLab via mongoose
mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoURI)
mongoose.connection
  .once('open', () => {
    if(process.env.NODE_ENV === 'production'){
      console.log("Connected to mLab");
    } else {
      console.log("Connected to local database")
    }
  })
  .on('error', error => console.log(error));

//Handle All Routes
app.use(authRoutes);
app.use(stripeRoutes);
app.use(surveyRoutes);

//Serve React app for all other routes
if(process.env.NODE_ENV === 'production'){
  //Express first checks to see if there's a file in client/build that matches the request (ie main.js)
  app.use(express.static('client/build'));

  //if not, we have a catch-all route that serves index.html
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

//Set up port for deployment or local env
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Running on port ${PORT} Lord Commander`);
});
