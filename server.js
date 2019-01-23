const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express();
const port = process.env.PORT || 3000

const timeStampRoute = require('./routes/TimeStamp')
const whoAmI = require('./routes/WhoAmI')
const exercise = require('./routes/Exercise')

// Initial middlewares
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true }))

// Routers
app.use('/api/timestamp', timeStampRoute)
app.use('/api/whoami', whoAmI)
app.use('/api/exercise', exercise)

app.listen(port, () => {console.log(`Listening on port ${port}...`)})