const jwt = require('jsonwebtoken');

function checkAuth(req, res, next){
    try{
        const token = req.headers.authorization.split(" ")[1]; // normally we use request headers to send tokens
                                                         //[1] for getting second half of the string   
        const decodedToken = jwt.verify(token, process.env.JWT_KEY);
        req.userData = decodedToken;
        next();
    }catch(error){
        return res.status(401).json({
            'message': "Invalid or expired token provided!!",
            'error': error
        });

    }
}

module.exports ={
    checkAuth : checkAuth
}