const bcrypt = require('bcrypt');
const UserAccount = require('../db/UserAccount');

module.exports.createUser = async (request)=>{

    const save = await UserAccount.create({
        user_id: request.userId,
        username: request.username,
        password:request.password,
        first_name:request.firstName,
        last_name:request.lastName,
        created_date:Date.now()
    });

    return save;
}

module.exports.checkUserByUsername = async (request)=>{

    const query = await UserAccount.findOne({username:request,status:true});

    return query;
}