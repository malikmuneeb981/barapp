const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({
      msg: "Authorization failed token not found",
    });
  }

  try {
    await jwt.verify(token, process.env.jwtusersecret, (err, decode) => {
      if (err) {
        throw err
      } else {
        req.category = decode.category;
        next();
      }
    });
  } catch (err) {
    console.log(err);
  }
};

// const jwt=require('jsonwebtoken')

// module.exports=async (req,res,next)=>{

//     const token = req.header('Authorization')
//     if(!token)
//     {
//        return res.status(401).json({
//         msg:'No token Authorization denied'

//         })
//     }
//     else{

//         try{
//             await jwt.verify(token,process.env.jwtusersecret,(err,decode)=>{

//                 if(err)
//                 {

//                     res.status(401).json({

// msg:"Token Not valid"

//                     })
//                 }
//                 else
//                 {
//                     req.user=decode.user
//                     next()
//                 }
//             })

//         }catch(err)
//         {
// console.log(`Something went wrong with server`);
//         }
//     }

// }
