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
    .then(data => {
      let username = data.username
      let log = data.log.sort((a, b) => b.date - a.date)
      res.send({
        status: 'success',
        data: {username, log}
      })
    })
    .catch(err => res.send('error'))
    .catch(err => res.status(400).send({error: 'Invalid user ID'}))
})

route.get('/log', (req, res) => {
  let {userId, from, to, limit} = req.query
  if(!userId) {
    res.status(400).send({error: "userId is required"})
  }
  // console.log(req.query)
  Exercise.findById({_id: userId})
    .then(data => {
      let log = data.log
      if(!limit) limit = 100
      if (!!from && !!to) {
        from = new Date(from)
        to = new Date(to)
        if (from == "Invalid Date" || to == "Invalid Date") {
          return res.status(400).send({
            error: "from and to must be valid date"
          })
        }
        log = log.filter(item => {
          return item.date > from && item.date < to
        })
      }
      log.sort((a, b) => b.date - a.date)
      let length = log.length < limit ? log.length : limit
      return res.status(200).send(log.slice(0, length));
    })
    .catch(() => res.status(400).send({error: 'Invalid user ID'}))
})

module.exports = route