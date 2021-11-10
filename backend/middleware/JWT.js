const {sign, verify} = require('jsonwebtoken')
require("dotenv").config
const createTokens = (user)=>{
    const accessToken = sign({first_name: user.first_name, userId: user.id},
       process.env.DB_TOKEN
       );
    return accessToken
};

module.exports = {createTokens}