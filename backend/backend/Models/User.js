const mongoose = require("mongoose")

const Schema = mongoose.Schema

const UserSchema = new Schema(
    {
        name: {
        type: String,
        required: true
    },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            required: true,
            type: String
        },
        expenses: [
            {

              text: {
                type: String,
                required: true,
            },
        
            amount: {
                type: Number,
                required: true
            },
            createdAt: {
                type: Date,
                default: Date.now
            }
        
        
        
        }

        ]

    },

)

const UserModel = mongoose.model('users', UserSchema)

module.exports = UserModel;