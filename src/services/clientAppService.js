const ClientApp = require('../db/ClientApp');

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