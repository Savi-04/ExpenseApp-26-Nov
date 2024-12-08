// MIDDLEWARES TO VALIDATE THE INPUTS IN LOGIN AND SIGNUP

const sanitize = require('mongo-sanitize');
const zod = require('zod')

//signup validation schema
const signupSchema = zod.object({
    name: zod.string().min(3).max(20), 
    email: zod.string().email(),
    password: zod.string().min(4)


})


//login validation schema

const loginSchema = zod.object({
    email: zod.string().email(),
    password: zod.string().min(4)          // make a note I might need to change it
})


//signup validation
function signupValidation(req, res, next){

    const signup_data = req.body;

    try {

        const sanitizedSignupData = {
            name: sanitize(signup_data.name),
            email: sanitize(signup_data.email),
            password: sanitize(signup_data.password),
        };

        if(signupSchema.safeParse(sanitizedSignupData).success){
            
    console.log("signup validation successful")

            req.body = sanitizedSignupData;
            next(); 
            return
            
             }
             return res.status(401).json({
                message: "enter valid input"
             })
             
    } catch (error) {
        return res.status(400).json({
            message: "Bad Request",
            error
        })
        
    }
}

//login validation

function loginValidation(req, res, next){
    const login_data = req.body;

    try {

        const sanitizedLoginData = {
            email: sanitize(login_data.email),
            password: sanitize(login_data.password),
        };

        if(loginSchema.safeParse(sanitizedLoginData).success){
            
            req.body = sanitizedLoginData;
            next(); 
            
            return
        }
    } catch (error) {
        return res.status(400).json({
            message: "Bad Request",
            error
        })
        
    }
}

module.exports = {signupValidation, loginValidation}