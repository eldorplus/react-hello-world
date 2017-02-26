const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('cookie-session');

const mongoose = require('mongoose');
const passport = require('passport');

const config = require('./config');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(express.static(path.join(__dirname, '../../static')));

if (config.env !== 'production') {
  app.use(express.static(path.join(__dirname, '../../coverage')));
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(session(config.session.secret));

mongoose.connect(config.mongo.uri, (err) => {
  if (err) console.error(`failed to connect to MongoDB with config ${JSON.stringify(config.mongo)}`); // eslint-disable-line no-console
  else console.info('succesfully connected to MongoDB database'); // eslint-disable-line no-console
});


// Configure passport middleware
app.use(passport.initialize());
app.use(passport.session());


// Register routes
app.use('/', require('./routes'));

module.exports = app;
