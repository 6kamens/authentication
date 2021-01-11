const ClientApp = require('../db/ClientApp');
const bcryptPassword = require('../utils/bcryptPassword');

module.exports.createApp = async (request)=>{

    const save = await ClientApp.create({
        client_id: request.clientId,
        client_secret : request.clientSecret,
        client_name:request.clientName,
        redirect_uri:request.redirectUri
    });

    return save;
}

module.exports.getAppByClientId = async (clientId)=>{
    const query = await ClientApp.findOne({client_id:clientId,status:true});
    return query;
}


module.exports.verifyClient = async (clientId,clientSecret)=>{

    const checkApp = await ClientApp.findOne({client_id:clientId,status:true});
    if(!checkApp)  return false;

    const isCorrectClientSecret = await bcryptPassword.verifyPassword(clientSecret, checkApp.client_secret );
    if(!isCorrectClientSecret)  return false;

    return true;

}