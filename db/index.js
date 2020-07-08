const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/MangoDB', {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});

const db = mongoose.connection;

db.on('error', () => {
  console.log('Connection Failed!');
});

db.once('open', () => {
  console.log('Connected!');
});

module.exports = db;