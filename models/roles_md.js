const mongoose = require('mongoose')
const schema = mongoose.Schema
const msg = 'field is required'
const rolesSchema = new schema({

    role: {
        type: String,
        required: [true, msg]
    } 

})

const rolesModel = mongoose.model("roles", rolesSchema)
module.exports = rolesModel