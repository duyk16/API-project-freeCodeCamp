const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 3000

const timeStampRoute = require('./routes/TimeStamp')
const whoAmI = require('./routes/WhoAmI')
const exercise = require('./routes/Exercise')

// Connect to DB
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true }, () => {
  console.log('Mongo was connected');
})

// Initial middlewares
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('public'))

// Routers
app.use('/api/timestamp', timeStampRoute)
app.use('/api/whoami', whoAmI)
app.use('/api/exercise', exercise)

// Send view to test exercise API 
app.get('/exercise', (req, res) => {
  res.sendFile(__dirname + '/views/exercise/index.html')
})

app.listen(port, () => {console.log(`Listening on port ${port}...`)})