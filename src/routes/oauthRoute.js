const express = require('express');
const router = express.Router();

router.post('/authorize');

router.post('/token');

router.post('/session');

router.post('/signout');


module.exports = router;