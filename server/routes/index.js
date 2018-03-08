const express = require('express');
const utliM = require('../controlers/messageCtrl');
const utliR = require('../controlers/roomCtrl');

const router = express.Router();
router.get('/history', (req, res) => {
  // console.log('chat history room param:', req.query);
  utliM.loadMessages(req.query.room).then(data => {
    res.status(200).json(data);
  });
});

router.get('/rooms', (req, res) => {
  utliR.loadRoom().then(data => {
    const result = {};
    console.log('hmmmm data');
    data.forEach(cur => {
      result[cur.roomname] = cur;
    });
    res.status(200).json(result);
  });
});

router.post('/rooms', (req, res) => {
  utliR.addNewRoom(req.body).then(data => {
    console.log('hmmmm data post to rooms', data);
    res.status(200).json(data);
  });
});

module.exports = router;
