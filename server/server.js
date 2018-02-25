const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
// const path = require('path');
// const favicon = require('serve-favicon');

const index = require('./routes/index');
const auth = require('./routes/auth');
const chat = require('./routes/chat');
const erase = require('./routes/erase');

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// app.use(express.static(path.join(__dirname, 'public')));

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'w')));

app.use('/', index);
app.use('/auth', auth);
app.use('/chat', chat);
app.use('/erase', erase);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
