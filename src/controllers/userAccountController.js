const userAccountService = require('../services/userAccountService');
const bcryptPassword = require('../utils/bcryptPassword');
const { v4: uuidv4 }  = require('uuid');

module.exports.register = async (req,res)=>{
    try {
        const checkUser = await userAccountService.checkUserByUsername(req.body.username);
        if(checkUser)  return res.status(401).json({status:false,statusCode:401,message:'existing username'});
        
        const pass = await bcryptPassword.hashPassword(req.body.password);

        const createUser = await userAccountService.createUser(
            {
                userId : uuidv4(),
                username : req.body.username,
                password : pass,
                firstName : req.body.firstName,
                lastName : req.body.lastName
            }
        );

        return res.json({status:true,statusCode:200,message:'success',data:createUser});
    } catch (error) {
        return res.status(500).json({status:false,statusCode:500,message:error.message});
    }
}

module.exports.login = async (req,res)=>{
    try {

        const checkUser = await userAccountService.checkUserByUsername(req.body.username);
        if(!checkUser)  return res.status(400).json({status:false,statusCode:400,message:'invalid username or password'});
        
        const isCorrectPassword = await bcryptPassword.verifyPassword(req.body.password,checkUser.password);
       
        if(isCorrectPassword){
            return res.json({status:true,statusCode:200,message:'success',data:'hello world'});
        }else{
            return res.status(400).json({status:true,statusCode:400,message:'invalid username or password'});
        }


    } catch (error) {
        return res.status(500).json({status:false,statusCode:500,message:error.message});
    }
}
