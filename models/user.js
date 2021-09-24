const mongose = require("mongoose");
const Schema = mongose.Schema;
const userSchema = new Schema({
  name: { type: String },
  userName: { type: String },
  phone: { type: String },
  email: { type: String },
});

const User = mongose.model("User", userSchema);
module.exports = User;
