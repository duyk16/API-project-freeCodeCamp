const express = require('express')
const route = express.Router()

const ShortId = require('../models/ShortId')

route.post('/new', (req, res) => {
  res.send(req.body.url)
})

module.exports = route