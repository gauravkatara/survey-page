const express = require('express');
const bodyParser = require('body-parser');
const app = express();
require('./dbConnection');

const questionRouter = require('./routes/questions');

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())


app.use('/api/question', questionRouter);

app.get('/', (req, res) => {
  res.send('Hello World Test!!!');
});

app.get('/echo/:name', (req, res) => {
  const name = req.params.name;
  res.send(`Hello ${name}!`);
});

const port = process.env.PORT || 7000;

app.listen(port, () => {
  console.log(`Hello Port Test: ${port}`);
});