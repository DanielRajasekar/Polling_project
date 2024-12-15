const jwt = require('jsonwebtoken');

const verifyToken = (req,res,next)=>{
    const token = req.cookies.token

    if(!token){
        return res.status(401).json("You are not authenticated");

    }
    else{
        jwt.verify(token,"Daniel",(err,user)=>{
    
            if(err){
                return res.status(403).json("Token is invalid");
            }
            else{
                req.userId = data._id
                next()
            }
        })
}
}
module.exports = verifyToken;

