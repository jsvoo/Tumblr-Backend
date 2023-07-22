const mongoose = require('mongoose')
const schema = mongoose.Schema
const msg = 'field is required'
const postSchema = new schema({
    title: {
        type: String,
        required: [true, msg]
    },

    excerpt: {
        type: String,
    },

    date: {
        type: Date,
        required: [true, msg]
    },

    body: {
        type: String,
        required: [true, msg]
    },

    user_id: {
        type: String, 
        required: [true, msg],
        ref:'Users'
    },

    post_category_id: {
        type: String,
        required: [true, msg],
        ref:"post_categories"
    },
    image: {
        type: Array,
        // default:[]
    },
    likes:{
        type:Number,
        required:[true, msg],
        min:0,
        default:0
    },

    adminId:{
        type:String,
        required:[true, msg]
    }
  
})



const postModel = mongoose.model("posts", postSchema)
module.exports = postModel