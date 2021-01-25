const express = require('express');
const {
    route
} = require('./oauthRoute');
const router = express.Router();
const passport = require('passport');
const externalOauthController = require('../controllers/externalOauthController');

router.get('/facebook', passport.authenticate('facebook', {
    scope: ['public_profile', 'email']
}));

router.get('/facebook/callback',
    passport.authenticate('facebook', {
        successRedirect: '/api/external-auth/facebook/login'
}));


router.get('/facebook/login',checkAuthentication,externalOauthController.facebook);


function checkAuthentication(req,res,next){
    if(req.isAuthenticated()){
        next();
    } else{
        res.redirect("http://localhost:3000/login");
    }
}

module.exports = router;