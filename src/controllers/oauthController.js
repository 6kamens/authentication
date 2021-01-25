const tokenOAuth = require('../services/tokenOAuth');
const tokenGenerator = require('../utils/tokenGenerator');
const clientAppService = require('../services/clientAppService');
const userAccountService = require('../services/userAccountService');
const { v4: uuidv4 }  = require('uuid');

module.exports.token = async (req,res)=>{

    try {
        
        const checkApp = await clientAppService.verifyClient(req.body.clientId,req.body.clientSecret);
        if(!checkApp)  return res.status(401).json({status:false,statusCode:401,message:'invalid clientId or clientSecret'});

        if(req.body.grantType == 'password_credentials'){

            // check username / password
            const checkUser = await tokenOAuth.oauthPasswordCredentials(req.body.username,req.body.password);
            if(!checkUser.result)  return res.status(400).json({status:false,statusCode:400,message:'invalid username or password'});
            
            const accessToken = uuidv4();
                        
            const saveToken = await tokenOAuth.create(accessToken,checkUser.user);

            const responseToken = {
                accessToken : accessToken,
                tokenType: 'bearer',
                expiresIn : 3600 
            };
            return res.json({status:true,statusCode:200,message:'success',data:responseToken });

        }else if(req.body.grantType == 'authorize_code'){
            // check authorize_code



        }else if(req.body.grantType == 'refresh_token'){
            // check refresh_token




        }else{
            return res.status(400).json({status:false,statusCode:400,message:'invalid grant type'});
        }


    } catch (error) {
        return res.status(500).json({status:false,statusCode:500,message:error.message});
    }

}



module.exports.session = async (req,res)=>{

    try {

      const verifyToken = await tokenOAuth.verifyAccessToken(req.body.accessToken);

      let userId = '';

      if(!verifyToken.status) return res.status(400).json({status:false,statusCode:400,message:'invalid token'});

      userId = verifyToken.userId ;

      const userInfo = await userAccountService.getUserInfo(userId); 
      if(!userInfo)   return res.status(404).json({status:false,statusCode:404,message:'not found user in this client id'});

      return res.json({status:true,statusCode:200,message:'success',data:{
          userId : userInfo.user_id,
          username : userInfo.username,
          firstName : userInfo.first_name ,
          lastName : userInfo.last_name,
          role:userInfo.role,
          picture:userInfo.picture,
          gender: userInfo.gender,
          birthDate :userInfo.birthdate,
          status : userInfo.status
      }});


    } catch (error) {

        return res.status(500).json({status:false,statusCode:500,message:error.message});

    }

}