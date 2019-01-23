const mongoose = require('mongoose')

const exerciseSchema = new mongoose.Schema({
  username: String,
  log: [{
    description: {type: String, required: true},
    duration: {type: Number, required: true},
    date: {type: Date, default: Date.now }
  }]
})

module.exports = mongoose.model('Exercise', exerciseSchema, 'exercises')