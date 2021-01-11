const clientAppService = require('../services/clientAppService');
const { v4: uuidv4 }  = require('uuid');
const bcryptPassword = require('../utils/bcryptPassword');

module.exports.register = async (req,res)=>{
    try {
        const uuidSecret = uuidv4();
        const clientSecret = await bcryptPassword.hashPassword(uuidSecret);

        const insertResult = await clientAppService.createApp({
            clientId : uuidv4(),
            clientSecret : clientSecret,
            clientName : req.body.clientName,
            redirectUri : req.body.redirectUri 
        });

        return res.json({status:true,statusCode:200,message:'success',data:{clientId:insertResult.client_id,clientSecret:uuidSecret}});

    } catch (error) {

        return res.status(500).json({status:false,statusCode:500,message:error.message});

    }
}