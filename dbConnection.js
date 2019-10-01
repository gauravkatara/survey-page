const mongoose = require('mongoose');
const dbConfig = require('./config/database.config.js');

mongoose.set('useCreateIndex', true);
mongoose.connect(dbConfig.url, { useNewUrlParser: true }, (err) => {
  if (err) {
    console.log('not connected to db');
    throw err;
  } else {
    console.log('connected to db');
  }
});

module.exports = mongoose;
