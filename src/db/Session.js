const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

const schema = mongoose.Schema({
        key:{
            type:String,
            unique : true,
        },
        value:{
            type:String,
        }
    }
);

module.exports = mongoose.model('auth_token',schema);