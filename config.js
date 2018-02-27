let HEROKU_URL = JSON.stringify('http://localhost:8080');
if (process.env.NODE_ENV === 'production') {
  HEROKU_URL = JSON.stringify('https://shielded-bastion-15522.herokuapp.com');
}

module.exports = HEROKU_URL;
