const mongoose = require("mongoose");
const schema = mongoose.Schema;

const adminSchema = new schema({
  name: {
    type: String,
    required: [true, "field is required"],
  },
  email: {
    type: String,
    required: [true, "field is required"],
  },
});



const adminModel = mongoose.model("admin", adminSchema)
module.exports = adminModel;
