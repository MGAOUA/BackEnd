const Todo = require("../../../models/todo");

const getTodosFromBDD = async (req, res) => {
  const listTodo = await Todo.find();
  res.status(200).send({
    message: "fetch success",
    data: listTodo,
  });
};
const CreateTodoFromBDD = async (req, res) => {
  const newTodo = new Todo({ ...req.body });
  await newTodo.save();
  res.status(201).send({ message: "todo created", data: newTodo });
};
const UpdateTodoFromBDD = async (req, res) => {
  const id = req.params.id;
  const todo = await Todo.findOne({ _id: id });
  if (!todo) return res.status(404).send({ message: "not found", data: {} });
  const updatedTodo = await Todo.updateOne({ _id: id }, { ...req.body });
  res.status(201).send({ message: "update sucess", data: {} });
};
const DeleteTodoFromBDD = async (req, res) => {
  const id = req.params.id;
  const todo = await Todo.findOne({ _id: id });
  if (!todo) return res.status(404).send({ message: "not found", data: {} });
  const deletedTodo = await Todo.deleteOne({ _id: id }, { ...req.body });
  res.status(201).send({ message: "delete sucess", data: {} });
};
const patchtodFromBDD = async (req, res) => {
  const action = req.query.action;
  const id = req.params.id;
  const todo = await Todo.find({ _id: id });
  if (!todo)
    return res.status(404).send({ message: "todo not found", data: {} });
  switch (action) {
    case "done":
      await Todo.updateOne({ _id: id }, { completed: true });
      break;
    case "undone":
      await Todo.updateOne({ _id: id }, { completed: false });
      break;
    default:
      break;
  }

  return res.status(201).send({ message: "todo  patched", data: {} });
};

module.exports = {
  getTodosFromBDD,
  CreateTodoFromBDD,
  UpdateTodoFromBDD,
  DeleteTodoFromBDD,
  patchtodFromBDD,
};
