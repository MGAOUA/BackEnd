const mongose = require("mongoose");
const Schema = mongose.Schema;
const todoSchema = new Schema({
  task: { type: String, default: "do somthing" },
  completed: { type: Boolean, default: false },
});

const todo = mongose.model("todo", todoSchema);
module.exports = todo;
