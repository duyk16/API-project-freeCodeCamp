const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const multer = require('multer')
var upload = multer({ dest: 'uploads/' })

const app = express();
const port = process.env.PORT || 3000

const timeStampRoute = require('./routes/TimeStamp')
const whoAmI = require('./routes/WhoAmI')
const exercise = require('./routes/Exercise')
const shortId = require('./routes/ShortId')
const fileAnalyse = require('./routes/FileAnalyse')

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
app.use('/api/shorturl', shortId)
app.use('/api/fileanalyse', upload.single('upfile'), fileAnalyse)

// Send view to test exercise API 
app.get('/exercise', (req, res) => {
  res.sendFile(__dirname + '/views/exercise/index.html')
})
app.get('/shorturl', (req, res) => {
  res.sendFile(__dirname + '/views/shortid/index.html')
})
app.get('/fileanalyse', (req, res) => {
  res.sendFile(__dirname + '/views/fileanalyse/index.html')
})

app.listen(port, () => {console.log(`Listening on port ${port}...`)})