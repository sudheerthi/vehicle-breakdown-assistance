const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
    ownerEmail: { 
        type: String, 
        required: true, 
        trim: true 
    },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5, 
  },
  comments: {
    type: String,
    required: false,
    maxlength: 500, 
    default:" ",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Feedback', feedbackSchema);
