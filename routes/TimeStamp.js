const express = require('express')
const route = express.Router()


route.get('/', (req, res) => {
  let date = new Date();
  return res.status(200).send({
    unix: date.getTime(),
    utc: date.toUTCString()
  })
})
route.get('/:dateString', (req, res) => {
  let dateString = req.params.dateString
  dateString = dateString == parseInt(dateString) ? parseInt(dateString) : dateString
  let date = new Date(dateString);
  if (date == "Invalid Date") {
    return res.status(300).send({
      error: "Invalid Date"
    })
  }
  return res.status(200).send({
    unix: date.getTime(),
    utc: date.toUTCString()
  })
})

module.exports = route