const mongoose = require('mongoose');
const environment = require('./environment');

mongoose.connect(`mongodb://localhost/${environment.db}`, {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log('Success');
});

module.exports = db;