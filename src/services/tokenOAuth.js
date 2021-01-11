const userAccountService = require('./userAccountService');
const bcryptPassword = require('../utils/bcryptPassword');
const AuthToken = require('../db/AuthToken');
const { v4: uuidv4 }  = require('uuid');
const jwt = require('jsonwebtoken');


module.exports.oauthPasswordCredentials = async (username,password)=>{

    const checkUser = await userAccountService.checkUserByUsername(username);

    if(!checkUser)  return {result:false , user : checkUser};

    const isCorrectPassword = await bcryptPassword.verifyPassword(password,checkUser.password);

    if(isCorrectPassword){
        return {result:true , user : checkUser};
     }else{
        return {result:false , user : checkUser};
     } 

}

module.exports.create = async (request)=>{

   const save = await AuthToken.create({
      access_token : request.accessToken,
      refresh_token : request.refreshToken,
      session : request.session
   });

   return save;
}

module.exports.verifyAccessToken = async (accessToken)=>{
   
   const query = await AuthToken.findOne({
      access_token : accessToken
   });

   if(!query){
      return {status : false}
   }

   const privateKey = process.env.ACCESS_KEY || '';

   try {
      const session = jwt.verify(query.session,privateKey);
      return  {status : true , userId : session.userId} ;
   } catch (error) {
      return {status : false}

   }

}