require('dotenv').config();
const mongoose = require("mongoose")



const mongo_url = process.env.MONGO_CONN;

async function ConnectDb(){

    try {
        await mongoose.connect(mongo_url)
        console.log("DB is running successfully")
    } catch (error) {
        console.log(`Not connected with error ${error}`)
    }
}


module.exports = ConnectDb 

