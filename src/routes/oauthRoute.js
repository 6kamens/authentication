const express = require('express');
const router = express.Router();
const oauthController = require('../controllers/oauthController');

router.post('/authorize');
router.post('/token',oauthController.token);
router.post('/session', oauthController.session);
router.post('/signout');

module.exports = router;