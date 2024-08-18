
const jwt = require('jsonwebtoken')
const JWT_SECRET = 'MY_SECRET_FOR_FSD_PROJECT'


const jwt_verify = function( req,res,next){
   const jwt_token = req.headers["authorization"]
   if(!jwt_token){
    res.statusCode = 401
    const response ={
        "message":"send the token"
    }
    res.set({
        "content-type":"Application/json"
    })
    res.send(response)
   }else{
    jwt.verify(jwt_token,JWT_SECRET,function(err,jwt_decoded){
      if(err){
        if(err.name == "TokenExpiredError"){
            res.statusCode = 401
            response ={
                "message":"Token is expired"
            }
            res.set({
                "content-type":"application/json"
            })
            res.send(response)
        }
        else{
            res.statusCode =401
            response={
                "message":"token is invalid"
            } 
            res.set({
                "content-type":"application/json"
            })
            res.send(response)
        }
      }else{
        res.locals = jwt_decoded
        next()
      }
    })
   }
}
module.exports =jwt_verify