const express = require('express');

const router = express.Router();
router.delete('/', (req, res) => {
  res.status(200).send('this is delete request');
});

module.exports = router;
