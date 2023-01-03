const mongoose = require('mongoose')
const schema = mongoose.Schema
const msg = 'field is required'

const likeSchema = new schema({
    post_id: {
        type: String,
        required:[true, msg],
        ref:"posts"
    },
    likedBy: {
        type: String,
        required: [true, msg],
        ref:"Users"
    }

})

const likeModel = mongoose.model("likes", likeSchema)
module.exports = likeModel