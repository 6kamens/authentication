const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

const schema = mongoose.Schema({
    user_id:{
        type:String,
        required:true,
        unique : true,
    },
    client_id:{
        type:String,
        required:true,
    },
    username:{
        type:String,
        required:true,
        unique : true
    },
    password:{
        type:String
    },
    role:{
        type:String
    },
    first_name:{
        type:String
    },
    last_name:{
        type:String
    },
    gender:{
        type:String
    },
    picture:{
        type:String
    },
    birthdate:{
        type:Date
    },
    status:{
        type:Boolean,
        default: true
    },
    created_date:{
        type:Date
    },
    updated_date:{
        type:Date
    }
});

schema.plugin(uniqueValidator);

module.exports = mongoose.model('user_account',schema);