const express = require('express');

const app = express();
const port = process.env.PORT || 3000

const timeStampRoute = require('./routes/TimeStamp')

app.use('/api/timestamp', timeStampRoute)

app.listen(port, () => {console.log(`Listening on port ${port}...`)})