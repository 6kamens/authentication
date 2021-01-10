const jwt = require('jsonwebtoken');

module.exports.accessTokenGenerator = () =>{
    
    const payload = {
        
    } ;

    const privateKey = process.env.AUTHORIZE_CODE_SECRET || '';

    const option = { expiresIn : 60 };

    return jwt.sign(payload , privateKey , option);
}