const express = require("express");
const controller = require("./controller");

const todoRouter = express.Router();

todoRouter
  .get("/", controller.getTodos)
  .get("/:id", controller.getTodoById)
  .post("/", controller.createTodo)
  .put("/:id", controller.updateTodo)
  .patch("/:id", controller.patchTodo)
  .delete("/:id", controller.deleteTodo);

module.exports = todoRouter;
