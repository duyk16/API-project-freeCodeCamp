const express = require('express')
const route = express.Router()

route.get('/', (req, res) => {
  res.send(process.env.MONGO_URL)
})
module.exports = route