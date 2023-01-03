const mongoose = require('mongoose')
const schema = mongoose.Schema
const msg = 'field is required'
const commentSchema = new schema({

    user_id: {
        type: String,
        required: [true, msg],
        ref:"Users"
    },

    post_id: {
        type: String,
        required:[true, msg],
        ref:"posts"
    },

    text: {
        type: String,
        required:[true, msg]
    }

})

const commentModel = mongoose.model("comments", commentSchema)
module.exports = commentModel