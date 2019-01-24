const express = require('express')
const route = express.Router()
const validUrl = require('valid-url')
const ids = require('short-id')

const ShortId = require('../models/ShortId')

route.post('/new', (req, res) => {
  let url = req.body.url

  if (!validUrl.isUri(url)) {
    return res.status(400).send('URL is not valid')
  } 

  var short = new ShortId({
    originalUrl: url,
    shortUrl: ids.generate()
  })
  console.log('short: ', short);
  short.save()
    .then((data) => {
      res.status(200).send({
        original_url: data.originalUrl,
        short_url: process.env.CURRENT_URL + '/api/shorturl/' + data.shortUrl,
      })
    })
    .catch(err => res.status(400).send(err))
})

route.get('/:id', (req, res) => {
  let id = req.params.id
  ShortId.find({shortUrl: id}).then(data => {
    if (data.length == 0) {
      return res.status(400).send('Not found your id')
    } else {
      res.redirect(data[0].originalUrl)
    }
  })
})

module.exports = route