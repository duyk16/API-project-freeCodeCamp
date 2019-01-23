const express = require('express')
const route = express.Router()

route.get('/', (req, res) => {
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  const language = req.headers['accept-language']
  const software = req.headers['user-agent']
  const ipaddress = ip.split(',')[0]
  res.send({ ipaddress, language, software })
})

module.exports = route