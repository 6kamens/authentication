const passport = require('passport');
const facebook = require('./facebook');

passport.serializeUser(function (user, cb) {
    cb(null, user);
  });
  
passport.deserializeUser(function (obj, cb) {
    cb(null, obj);
});

passport.use(facebook);

module.exports = passport;