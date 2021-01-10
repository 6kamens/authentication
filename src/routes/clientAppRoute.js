const express = require('express');
const { route } = require('.');
const router = express.Router();
const clientAppController = require('../controllers/clientAppController');

router.post('/register',clientAppController.register);


module.exports =  router;