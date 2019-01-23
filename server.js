const express = require('express');

const app = express();
const port = process.env.PORT || 3000

const timeStampRoute = require('./routes/TimeStamp')
const whoAmI = require('./routes/WhoAmI')
const exercise = require('./routes/Exercise')

app.use('/api/timestamp', timeStampRoute)
app.use('/api/whoami', whoAmI)
app.use('/api/exercise', exercise)

app.listen(port, () => {console.log(`Listening on port ${port}...`)})