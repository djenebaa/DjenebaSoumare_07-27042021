 const jwt = require('jsonwebtoken');
require("dotenv").config();


module.exports = (req, res, next) => {
  try {
     const token = req.headers["x-access-token"];
    const decodedToken = jwt.verify(token, process.env.DB_TOKEN);
    const userId = decodedToken.userId;
    if (req.body.userId && req.body.userId !== userId) {
      throw 'Invalid user ID';
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
}; 


// module.exports = (req, res, next) =>{
//   const token = req.cookies.userId;
// if (!token) { 
//   res.send("need id")
// } 
//  else {
//     jwt.verify(token, process.env.DB_TOKEN,async (err, decoded)=>{
//       if(err){
//         res.json({auth: false,token:token, message:"noo token"});
//         console.log(err);
//       }
//       else{
//         console.log(decoded);
//         req.userId = decoded.id;
//         next(); 
//         res.send("here")
//       }
//     })
//   }
// }


//req.headers.authorization.split(' ')[1];


