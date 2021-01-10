const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

const schema = mongoose.Schema({
        access_token:{
            type:String,
            required:true,
            unique : true,
        },
        refresh_token:{
            type:String,
            unique : true
        },
        user_authorities:{
            type:String
        },
        session:{
            type:String
        }
    }
);

module.exports = mongoose.model('auth_token',schema);