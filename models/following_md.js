const mongoose = require('mongoose')
const schema = mongoose.Schema
const msg = 'field is required'
const followingSchema = new schema({

    user_id: {
        type: String,
        required: [true, msg]
    },

    follower_id: {
        type: String,
        required: [true, msg]
    }

})

const followingModel = mongoose.model("followings", followingSchema)
module.exports = followingModel