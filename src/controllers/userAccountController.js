const userAccountService = require('../services/userAccountService');
const clientAppService = require('../services/clientAppService');
const bcryptPassword = require('../utils/bcryptPassword');
const { v4: uuidv4 }  = require('uuid');
// const authorizeCodeGen = require('../utils/authorizeCodeGenerator');

module.exports.register = async (req,res)=>{
    try {
        const checkApp = await clientAppService.verifyClient (req.body.clientId,req.body.clientSecret);
        if(!checkApp)  return res.status(401).json({status:false,statusCode:401,message:'invalid clientId or clientSecret'});

        const checkUser = await userAccountService.checkUserByUsername(req.body.username);
        if(checkUser)  return res.status(401).json({status:false,statusCode:401,message:'existing username'});
        
        const pass = await bcryptPassword.hashPassword(req.body.password);

        const createUser = await userAccountService.createUser(
            {
                userId : uuidv4(),
                username : req.body.username,
                password : pass,
                firstName : req.body.firstName,
                lastName : req.body.lastName,
                clientId : req.body.clientId
            }
        );

        return res.json({status:true,statusCode:200,message:'success',data:{userId: createUser.user_id}});

    } catch (error) {
        return res.status(500).json({status:false,statusCode:500,message:error.message});
    }
}

