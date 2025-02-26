const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firebaseUid: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  displayName: String,
  settings: {
    defaultPomodoroLength: {
      type: Number,
      default: 1500
    },
    defaultBreakLength: {
      type: Number,
      default: 300
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);