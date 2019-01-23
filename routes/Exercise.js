const express = require('express')
const route = express.Router()

const Exercise = require('../models/Exercise')

route.post('/new-user', (req, res) => {
  const { username } = req.body
  if (!username) {
    return res.status(400).send({
      "error": "username is required"
    })
  }
  let exercise = new Exercise({username})
  exercise.save()
    .then(data => res.status(200).send({
      id: data._id,
      username: data.username
    }))
    .catch(err => res.status(400).send(err))
})

route.post('/add', (req, res) => {
  let {userId, description, duration, date} = req.body
  let error = []

  if (!userId || !description || !duration) {
    error.push('userId, description, duration are required')
  }
  if (isNaN(duration)) {
    error.push('duration must be Number')
  }
  if (date) {
    date = new Date(date)
    if (date == "Invalid Date") {
      error.push("Invlid Date")
    }
  }

  // Check error
  if(error.length) return res.status(400).send({error: error})
  // Find user by ID
  Exercise.findById({_id: userId})
    .then(data => {
      let log = date ? {description, duration, date} : {description, duration}
      console.log(log)
      data.log.push(log)
      console.log(data)
      return data.save()
    })
    .then(data => res.send(data))
    .catch(err => res.send('error'))
    .catch(err => res.status(400).send({error: 'Invalid user ID'}))
})



route.get('/', (req, res) => {
  Exercise.find()
    .then(data => {
      res.send(data)
    })
})
module.exports = route