import express from 'express'
import path from 'path'
import logger from 'morgan'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import session from 'express-session'
import errorhandler from 'errorhandler'
import cors from 'cors'

const app = express()
const isProduction = process.env.NODE_ENV === 'production'

// setup
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(session({ secret: 'contempo-node', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false }))

// static files
app.use(express.static(path.join(__dirname, 'dist')))

app.use(cors())

if (!isProduction) {
  app.use(errorhandler());
}

// mongo database
if (isProduction) {
  mongoose.connect(process.env.MONGODB_URI)
} else {
  mongoose.connect('mongodb://localhost/contempo-node', {useMongoClient: true})
  mongoose.set('debug', true)
}

/* eslint-disable */
// models
import './models/User'

// passport strategy
import './strategy/passport'

// routes
import routes from './routes'
/* eslint-disable */

app.use(routes)

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (!isProduction) {
  app.use((err, req, res, next) => {
    console.log(err.stack);

    res.status(err.status || 500);

    res.json({'errors': {
      message: err.message,
      error: err
    }})
  })
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({'errors': {
    message: err.message,
    error: {}
  }})
})

// finally, let's start our server...
const server = app.listen( process.env.PORT || 3000, function(){
  console.log('Listening on port ' + server.address().port)
})