const jwt = require('jsonwebtoken');

module.exports.accessTokenGenerator = (userId) =>{
    
    const payload = {
        userId : userId
    } ;

    const privateKey = process.env.ACCESS_KEY || '';

    const option = { expiresIn :  3600 };

    return jwt.sign(payload , privateKey , option);
}


module.exports.refreshTokenGenerator = () =>{
    
    const payload = {

    } ;

    const privateKey = process.env.AUTHORIZE_CODE_SECRET || '';

    const option = { expiresIn : 259200 };

    return jwt.sign(payload , privateKey , option);
}