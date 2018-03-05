let HEROKU_URL = JSON.stringify('http://localhost:1111');
if (process.env.NODE_ENV === 'production') {
  HEROKU_URL = JSON.stringify('https://icy-chatterbox.herokuapp.com');
}

module.exports = HEROKU_URL;
