const express = require('express');

const router = express.Router();
router.get('/', (req, res) => {
  res.status(200).send('this is get chat request');
});

module.exports = router;
