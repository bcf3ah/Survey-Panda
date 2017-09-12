const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const _ = require('lodash');
const Path = require('path-parser');
const {URL} = require('url');

const authCheck = require('./middlewares/authCheck');
const creditCheck = require("./middlewares/creditCheck");

const Survey = mongoose.model("Survey");
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/email-templates/surveyTemplate');

router.get("/api/surveys/thanks", (req, res) => {
  res.send("Thank you for submitting feedback!");
});

//webhook route for Sendgrid
router.post("/api/surveys/webhooks", (req, res) => {
  const events = _.map(req.body, event => {
    const pathname = new URL(event.url).pathname;
    const p = new Path('/api/surveys/:surveyId/:choice');
    console.log(p.test(pathname));
  })
});

//survey creation route handler
router.post('/api/surveys', authCheck, creditCheck, async (req, res) => {
  const {title, subject, body, recipients} = req.body;

  const survey = new Survey({
    title: title,
    subject: subject,
    body: body,
    recipients: recipients.split(",").map(email => ({email: email.trim()})),
    _author: req.user.id,
    dateSent: Date.now()
  });

  const mailer = new Mailer(survey, surveyTemplate(survey));
  try{
    await mailer.send();
    await survey.save();
    req.user.credits -= 1;
    const updatedUser = await req.user.save();
    res.send(updatedUser);
  } catch(e){
    res.status(422).send(e);
  }
});

module.exports = router;
