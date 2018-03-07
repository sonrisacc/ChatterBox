const express = require('express');
const utli = require('../controlers/userCtrl');
const utliR = require('../controlers/roomCtrl');

const router = express.Router();

router.get('/', (req, res) => {
  const { userName } = req.query;
  utli.checkUserExists(userName).then(data => {
    res.status(200).json(data);
  });
});

router.post('/', (req, res) => {
  const { userName } = req.body;
  utli.addNewUser(userName).then(data => {
    console.log('saved user', data);
    res.status(200).json(data);
  });
});

router.get('/room', (req, res) => {
  const { password, roomname } = req.query;
  utliR.checkRoomPwd(password, roomname).then(data => {
    console.log('checked room pwd', data);
    res.status(200).json(data);
  });
});

module.exports = router;
