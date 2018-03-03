const express = require('express');
const utli = require('../controlers/messageCtrl');

const router = express.Router();
router.get('/history', (req, res) => {
  console.log('chat history room param:', req.query);

  utli.loadMessages(req.query.room).then(data => {
    res.status(200).json(data);
  });
});

module.exports = router;
