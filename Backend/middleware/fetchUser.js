// Connecting with our packages.
const jwt = require('jsonwebtoken');

// Making a JsonWebToken sign.
const JWT_SECRET = "Thisisasecret$sign";

const fetchUser = (req,res,next)=>{
    // Get the user from the jwt token and add id to req object.
    const token = req.header('auth-token');
    if(!token){
        res.status(401).send({error:"Please authenticate using a valid token"})
    }

    
    try {

        // Verify the token and also the secret sign
        const data = jwt.verify(token,JWT_SECRET);
        // req.user will use in getuser api.
        req.user = data.user;
        // next is the function which allow middlewear to move on next part of the api.
        next();
        
    } catch (error) {
        res.status(401).send({error:"Please authenticate using a valid token"})
    }
}


module.exports = fetchUser;