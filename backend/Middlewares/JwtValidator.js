const jwt = require('jsonwebtoken')

function ensureAuthenticated(req, res, next){
     console.log("first")       //to be removed

    const auth = req.headers.authorisation;
    
    if(!auth){
        

        return res.status(403).json({
            message: 'Unauthorised, JWT token is required'
        })}

    try {
        const decoded = jwt.verify(auth, process.env.JWT_SECRET);   //validate the jwt token
        req.user = decoded;
        next();
        return;
    } catch (err) {
     

        return Response.status(403).json({
            message: 'Unauthorised, JWT token has expired'
        });
    }
    
}
module.exports = ensureAuthenticated;