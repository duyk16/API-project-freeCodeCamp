const express = require('express')
const route = express.Router()

route.get('/:dateString', (req, res) => {
  let dateString = req.params.dateString
  let date = new Date();
  if (dateString) {
    dateString = dateString == parseInt(dateString) ? parseInt(dateString) : dateString
    date = new Date(dateString);
  }
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