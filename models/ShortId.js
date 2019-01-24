const mongoose = require('mongoose')

const shortIdShema = new mongoose.Schema({
  originalUrl: {type: String, required: true},
  shortUrl: {type: String, required: true}
})

module.exports = mongoose.model('ShortId', shortIdShema, 'shortId')