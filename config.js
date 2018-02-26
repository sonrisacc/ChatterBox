let URL = JSON.stringify('http://localhost:3033');
if (process.env.NODE_ENV === 'production') {
  URL = JSON.stringify('https://shielded-bastion-15522.herokuapp.com/');
}

module.exports = {
  URL
};
