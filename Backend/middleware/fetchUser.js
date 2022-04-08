const jwt = require('jsonwebtoken');
const jwt_secret="shhhh";

const fetchUser = (req,res,next)=>{
    const token  = req.header('auth-token');
    if(!token){
        res.status(401).send({error:"Wrong"});
    }

    try{
        const data = jwt.verify(token,jwt_secret);
        req.user= data.user;
        next();

    }

    catch(error){
        res.status(401);
    }



}

module.exports=fetchUser