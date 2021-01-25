const jwt = require('jsonwebtoken');

module.exports.accessTokenGenerator = (userId) =>{
    
    const payload = {
        userId : userId
    } ;

    const privateKey = process.env.ACCESS_KEY || '';

    const option = { expiresIn :  3600 };

    return jwt.sign(payload , privateKey , option);
}


module.exports.refreshTokenGenerator = (userId , accessToken) =>{
    
    const payload = {
        userId : userId,
        accessToken : accessToken
    } ;

    const privateKey = process.env.REFRESH_KEY || '';

    const option = { expiresIn : 259200 };

    return jwt.sign(payload , privateKey , option);
}