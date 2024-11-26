const jwt = require('jsonwebtoken')

function ensureAuthenticated(req, res, next){
     console.log("first")       //to be removed

    const auth = req.headers.authorisation;
    console.log(auth)    //to be removed
    if(!auth){
        console.log("second")       //to be removed

        return res.status(403).json({
            message: 'Unauthorised, JWT token is required'
        })}

    try {
        const decoded = jwt.verify(auth, process.env.JWT_SECRET);   //validate the jwt token
        req.user = decoded;
        next();
        return;
    } catch (err) {
     console.log("third")       //to be removed

        return Response.status(403).json({
            message: 'Unauthorised, JWT token has expired'
        });
    }
    
}
module.exports = ensureAuthenticated;