const mongoose = require("mongoose");
const { Schema } = mongoose;
const Recipient = require("./Recipient");

const surveySchema = new Schema({
  title: String,
  _author: { type: Schema.Types.ObjectId, ref: 'User'},
  subject: String,
  body: String,
  recipients: [Recipient],
  yes: {type: Number, default: 0},
  no: {type: Number, default: 0},
  dateSent: Date,
  lastResponded: Date
});

mongoose.model("Survey", surveySchema);
