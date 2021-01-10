const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

const schema = mongoose.Schema({
    client_id:{
        type:String,
        required:true,
        unique : true,
    },
    client_name:{
        type:String
    },
    client_secret:{
        type:String,
        required:true,
        unique : true,
    },
    redirect_uri:{
        type:String
    },
    status:{
        type:Boolean,
        default:true
    }
    
});


module.exports = mongoose.model('client_app',schema);