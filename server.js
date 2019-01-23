const express = require('express');

const app = express();
const port = process.env.PORT || 4000;

app.get('/api/:time', (req, res) => {

})

app.listen(port, () => {console.log(`Listening on port ${port}...`)})