const express = require('express');
const router = express.Router();
const userAccountController = require('../controllers/userAccountController');

router.post('/register',userAccountController.register);
// router.post('/login',userAccountController.login);

module.exports = router;