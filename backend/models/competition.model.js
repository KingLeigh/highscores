const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const competitionSchema = new Schema({
  competitioncode: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  },
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 3
  }
}, {
  timestamps: true,
});

const Competition = mongoose.model('Competition', competitionSchema);

module.exports = Competition;