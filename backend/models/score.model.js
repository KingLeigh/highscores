const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const scoreSchema = new Schema({
  userId: { type: String, required: true },
  eventId: { type: String, required: true },
  score: { type: Number, required: true },
  date: { type: Date, required: true },
  competition: { 
    type: Schema.Types.ObjectId, 
    ref: 'Competition', 
    required: [true, "Competition required."]
  }
}, {
  timestamps: true,
});

const Score = mongoose.model('Score', scoreSchema);

module.exports = Score;
