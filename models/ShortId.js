const mongoose = require('mongoose')

const shortIdShema = new mongoose.Schema({
  original_url: {type: String, required: true},
  short_url: {type: String, required: true}
})

module.exports = mongoose.model('ShortId', shortIdShema, 'shortId')