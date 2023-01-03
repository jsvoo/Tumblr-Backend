const mongoose = require('mongoose')
const schema = mongoose.Schema
const msg = 'field is required'
const post_categorySchema = new schema({

    post_category: {
        type: String,
        required:[true, msg]
    }

})

const post_categoryModel = mongoose.model("post_categories", post_categorySchema)
module.exports = post_categoryModel