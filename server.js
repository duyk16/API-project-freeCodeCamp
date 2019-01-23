const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

app.get('/api/timestamp/:dateString', (req, res) => {
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

app.listen(port, () => {console.log(`Listening on port ${port}...`)})