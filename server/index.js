const express = require('express');
const bodyParser = require('body-parser');
const router = require('./routes');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// for parsing application/x-www-form-urlencoded

app.use(express.static('public'));
app.use('/api', router);

const PORT = process.env.PORT || 8080;
const HOST = 'localhost';

app.listen(PORT, () => {
  console.log(`listening on http://${HOST}:${PORT}`);
});
