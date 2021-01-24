const bcrypt = require('bcrypt');
const { request } = require('express');
const UserAccount = require('../db/UserAccount');

module.exports.createUser = async (request)=>{

    const save = await UserAccount.create({
        user_id: request.userId,
        username: request.username,
        role:'MEMBER',
        password:request.password,
        first_name:request.firstName,
        last_name:request.lastName,
        created_date:Date.now(),
        client_id:request.clientId
    });

    return save;
}

module.exports.checkUserByUsername = async (request)=>{

    const query = await UserAccount.findOne({username:request,status:true});

    return query;
}

module.exports.getUserInfo = async (userId)=>{
    
    const query = await UserAccount.findOne({user_id:userId});
    
    return query;
}

module.exports.getPasswordByUserId = async (userId)=>{
    
    const query = await UserAccount.findOne({user_id:userId}).select({password:1});
    
    return query.password;
}
