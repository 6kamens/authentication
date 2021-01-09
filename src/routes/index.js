const express = require('express');
const router = express.Router();
const oauthRoute = require('./oauthRoute');
const userAccountRoute = require('./userAccountRoute');
const clientAppRoute = require('./clientAppRoute');
 
router.use('/oauth',oauthRoute);
router.use('/user',userAccountRoute);
router.use('/app',clientAppRoute);


module.exports = router;