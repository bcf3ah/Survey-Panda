const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const stripe = require('stripe')(require("../config/keys").stripeSecretKey);

const authCheckMW = require("./middlewares/authCheck");

//handle stripe token and update user model
router.post("/api/stripe", authCheckMW, async (req, res) => {
  try{
    const charge = await stripe.charges.create({
      amount: 500,
      currency: "usd",
      source: req.body.id,
      description: "$5 charge for 5 credits"
    });
  } catch(e){
    console.log("error at stripeRoute!");
  }

  //update user's credits
  req.user.credits += 5;
  try{
    const updatedUser = await req.user.save();

    //send updated user back to client to update header
    res.send(updatedUser);
  } catch(e){
    console.log("Unable to update credits");
  }
});

module.exports = router;
