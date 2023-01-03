const mongoose = require("mongoose")
const schema = mongoose.Schema

const validate_singnupEmail_schema = new schema({
    email: {
        type: String,
        required: [true, "field is required"]
    },
    name:{
        type:String
    }
})

const validate_singnupEmail_model = mongoose.model("valid_signup_emails", validate_singnupEmail_schema)
module.exports = validate_singnupEmail_model