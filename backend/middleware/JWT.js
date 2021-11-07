const {sign, verify} = require('jsonwebtoken')
require("dotenv").config
const createTokens = (user)=>{
    const accessToken = sign({first_name: user.first_name, userId: user.id},
       process.env.DB_TOKEN
       );
    return accessToken
};

const validateToken = (req, res, next) =>{
 const accessToken = req.headers["x-access-token"]
 if (!accessToken) 
 return res.status(400).json({error:"User not Authenticated"});
 try {
 const validToken = verify(accessToken, process.env.DB_TOKEN)
 if (validToken) {
     req.authenticated = true
     return next();
 }
 }
 catch(err){
   return res.status(400).json({error: err})
 }
}
module.exports = {createTokens, validateToken}