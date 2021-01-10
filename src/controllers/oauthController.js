



module.exports.login = async (req,res)=>{
    
    try {

        const checkUser = await userAccountService.checkUserByUsername(req.body.username);
        if(!checkUser)  return res.status(400).json({status:false,statusCode:400,message:'invalid username or password'});
        
        const isCorrectPassword = await bcryptPassword.verifyPassword(req.body.password,checkUser.password);
        
        if(isCorrectPassword){
           return res.json({status:true,statusCode:200,message:'success',data:{
               a
           }});
        }else{
            return res.status(400).json({status:false,statusCode:400,message:'invalid username or password'});
        }


    } catch (error) {
        return res.status(500).json({status:false,statusCode:500,message:error.message});
    }

}
