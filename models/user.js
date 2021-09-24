const { string } = require("joi");
const { v4: uuid4 } = require("uuid");
const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const Schema = mongoose.Schema;
const userSchema = new Schema(
  {
    userId: { type: String },
    name: { type: String },
    userName: { type: String },
    phone: { type: String },
    email: { type: String, unique: true },
  },
  { timestamps: true }
);

userSchema.pre("save", function (next) {
  this.userId = uuid4();
  next();
});

userSchema.plugin(uniqueValidator);
const User = mongoose.model("User", userSchema);

module.exports = User;
