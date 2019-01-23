const express = require('express')
const route = express.Router()

route.get('/', (req, res) => {
  console.log(process.env);
  
  res.send(process.env.MONGO_URL)
})
route.post('/', (req, res) => {

})

module.exports = route