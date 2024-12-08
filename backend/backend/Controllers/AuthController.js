const UserModel = require("../Models/User");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


async function signup(req, res) {
   
   
    console.log("signup controller is running")
try {
    const { name, email, password } = req.body;

    const user_exist = await UserModel.findOne({ email })

    

        if (!user_exist)
        {
            console.log("if is running")
            const newUser = new UserModel({
                name: name,
                email: email,
                password: password

            })

            newUser.password = await bcrypt.hash(password, 10) //encryption of password before saving
            await newUser.save();
            console.log("Save Success")    //to be removed
            return res.status(201).json({
                message: "Signup done Successfully",
                success: true
            })                                     //saved to database

        } else return res.status(409).json({ message: "User already exists", success: false })



    }catch (err){
        return res.status(500).json({
            message: "Internal server error",
            success: false
        })
    }
}

//login controller logic

async function login(req, res){
    try{    
            console.log("Frontend logn request")   //to be removd later
            const { email, password } = req.body;
            const userExists = await UserModel.findOne({ email })
            if(!userExists){
                return res.status(400).json({
                    message: "Email or Password is wrong"
                })
            }

            const passCheck = await bcrypt.compare(password, userExists.password)
            if(!passCheck){
                return res.status(400).json({
                    message: "Email or Password is wrong"
                })
            }
            const jwtToken = jwt.sign({email: userExists.email, id: userExists._id},
                process.env.JWT_SECRET, { expiresIn: '24h' }
            )
        //    console.log("sent Jwt token is --", jwtToken)       //to be removed
            return res.status(201).json({
                message: "Sign in Successful",
                success: true, 
                authorisation: jwtToken,     //I could have used any name in place of Authorisation
                name: userExists.name,
                email
            })
    }catch (err){
        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        })
    }


}

module.exports = { signup, login }