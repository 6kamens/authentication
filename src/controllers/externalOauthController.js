const userAccountService = require('../services/userAccountService');
const clientAppService = require('../services/clientAppService');
const bcryptPassword = require('../utils/bcryptPassword');
const tokenGenerator = require('../utils/tokenGenerator');
const {
    v4: uuidv4
} = require('uuid');
const tokenOAuth = require('../services/tokenOAuth');
const url = require('url');    


module.exports.facebook = async (req, res) => {

    const checkUser = await userAccountService.checkUserByUsername(req.user.id);
    
    //already have facebook user
    if (checkUser) {

        const accessToken = uuidv4();

        const saveToken = await tokenOAuth.create(
            accessToken,
            checkUser
        );

        res.redirect(url.format({
            pathname:"http://localhost:3000/login",
            query: {
               "t": accessToken
             }
          }));

    } else {

         //register new user

         const createUser = await userAccountService.createUser(
            {
                userId : uuidv4(),
                username : req.user.id,
                password : null,
                firstName : req.user.displayName,
                lastName : null,
                clientId : 'e648e8d2-966c-4480-a9fd-719c4ce7d535'
            }
        );

        if(createUser){
            const accessToken = uuidv4();

            const saveToken = await tokenOAuth.create(
                accessToken,
                createUser
            );
    
            res.redirect(url.format({
                pathname:"http://localhost:3000/login",
                query: {
                   "t": accessToken
                 }
              }));
        }else{

            res.redirect(url.format({
                pathname:"http://localhost:3000/login",
                query: {
                   "error": 'fdsfsfdsdfdf'
                 }
              }));
            
        }


    }



}