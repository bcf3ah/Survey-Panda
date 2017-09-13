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

//route handler for when recipients give feedback
router.get("/api/surveys/:surveyId/:choice", (req, res) => {
  res.send("Thank you for submitting feedback!");
});

//webhook route for Sendgrid
router.post("/api/surveys/webhooks", (req, res) => {
  const p = new Path('/api/surveys/:surveyId/:choice');
  _.chain(req.body)
    .map(({url, email}) => {
      const match = p.test(new URL(url).pathname);
      if(match){
        return {email, surveyId: match.surveyId, choice: match.choice};
      }
    })
    .compact()
    .uniqBy('email', 'surveyId')
    .each(({email, choice, surveyId}) => {
      Survey.updateOne({
        _id: surveyId,
        recipients: {
          $elemMatch: { email, responded: false}
        }
      },{
        $inc: { [choice]: 1 },
        $set: { 'recipients.$.responded' : true },
        lastResponded: new Date()
      }).exec();
    })
    .value();

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

//give front end list of surveys by user
router.get("/api/surveys", authCheck, async (req, res) => {
  const surveys = await Survey.find({_author: req.user.id}, '-recipients');
  res.send(surveys);
});

module.exports = router;
