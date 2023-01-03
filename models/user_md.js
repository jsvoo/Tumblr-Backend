const mongoose = require('mongoose')
const schema = mongoose.Schema

const userSchema = new schema({
    name: {
        type: String,
        required: [true, "field is required"]
    },
    email: {
        type: String,
        required: [true, "field is required"]
    },

    phone: {
        type: String,
        required: [true, "field is required"]
    },

    password: {
        type: String,
        required: [true, "field is required"]
    },

    image: {
        type: String,
        required: [true, "field is required"]
    },

    verified_at: {
        type: Date,
    },

    current_verification: {
        type: String,
        required: [true, "field is required"]
    },

    exp_time: {
        type: String,
     },

    role_id: {
        type: String,
        required: [true, "field is required"],
        ref:"roles"
    }




})

const userModel = mongoose.model('Users', userSchema)
module.exports = userModel 