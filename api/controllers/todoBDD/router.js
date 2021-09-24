const express = require("express");

const controller = require("./controller");
const validator = require("../../../validator/todo");
const useRouter = express.Router();
useRouter
  .get("/", controller.getTodosFromBDD)
  .post("/", validator.validatePost, controller.CreateTodoFromBDD)
  .put("/:id", validator.validatePut, controller.UpdateTodoFromBDD)
  .delete("/:id", controller.DeleteTodoFromBDD)
  .patch("/:id", controller.patchtodFromBDD);

module.exports = useRouter;
