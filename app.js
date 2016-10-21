'use strict';

const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const configs = require('./configs');
const MongoClient = require('mongodb').MongoClient;
const sassMiddleware = require('node-sass-middleware');

const app = express();

// Allow the CSS version of our SASS files to be accessible via HTTP
app.use(sassMiddleware({
    /* Options */
    src: __dirname + '/sass',
    dest: __dirname + '/public',
    outputStyle: 'expanded'
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Connect to DB
MongoClient.connect(configs.mongo_url, function(err, db) {
  if(err){ return console.log('Failed to connect to DB.', err); }
  // require the seed file and invoke it with the DB ref.
  require('./db/seed.js')(db);
  // setup the routes and pass the DB ref. to them
  app.use('/', require('./routes/index')(db));
  // app.use('/users', require('./routes/users'));
});

module.exports = app;
