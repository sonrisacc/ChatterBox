const express = require('express');
const utli = require('../controlers/messageCtrl');

const router = express.Router();
router.get('/history', (req, res) => {
  utli.loadMessages().then(data => {
    res.status(200).json(data);
  });
});

module.exports = router;
