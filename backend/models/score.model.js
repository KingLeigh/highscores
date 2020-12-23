const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const scoreSchema = new Schema({
  usercode: { type: String, required: true },
  eventcode: { type: String, required: true },
  score: { type: Number, required: true },
  date: { type: Date, required: true },
}, {
  timestamps: true,
});

const Score = mongoose.model('Score', scoreSchema);

module.exports = Score;
