const mongoose = require("mongoose")
const schema = mongoose.Schema

const valLoginEmail_schema = new schema({
    email:{
        type:String,
        required:[true, "Field is required"]
    }
})

const valLoginEmail_model = mongoose.model("Valid Emails", valLoginEmail_schema)
module.exports=valLoginEmail_model