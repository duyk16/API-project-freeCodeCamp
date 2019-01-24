const express = require('express')
const route = express.Router()

route.post('/', (req, res) => {
  let file = req.file
  res.status(200).send({
    name: file.originalname,
    type: file.mimetype,
    size: file.size
  })
})

module.exports = route