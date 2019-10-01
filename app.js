const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!!!');
});

app.get('/echo/:name', (req, res) => {
  const name = req.params.name;
  res.send(`Hello ${name}!`);
});

const port = process.env.PORT || 7000;

app.listen(port, () => {
  console.log(`Hello ${port}`);
});