// MIDDLEWARES TO VALIDATE THE INPUTS IN LOGIN AND SIGNUP


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
        if(signupSchema.safeParse(signup_data).success){
            
    console.log("signup validation successful")

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
        if(loginSchema.safeParse(login_data).success){
            
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