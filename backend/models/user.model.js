const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 3
  },
  competition: { 
    type: Schema.Types.ObjectId, 
    ref: 'Competition', 
    required: [true, "Competition required."]
  }  
}, {
  timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;