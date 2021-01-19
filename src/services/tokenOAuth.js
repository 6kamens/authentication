const userAccountService = require('./userAccountService');
const bcryptPassword = require('../utils/bcryptPassword');
const AuthToken = require('../db/Session');
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
      key : request.key,
      value : request.value
   });

   return save;
}

module.exports.verifyAccessToken = async (accessToken)=>{
   
   const query = await AuthToken.findOne({
      key : accessToken
   });

   if(!query){
      return {status : false}
   }

   const privateKey = process.env.ACCESS_KEY || '';

   try {

      const session = jwt.verify(query.value,privateKey);

      if(session.userId != '' || session.userId.length != 0){
         const checkPassword = await userAccountService.getPasswordByUserId(session.userId);
         if(checkPassword != session.password)
            return {status : false};
      }

      return  {status : true , userId : session.userId} ;

   } catch (error) {
      return {status : false}
   }

}