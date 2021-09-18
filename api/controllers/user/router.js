const express = require("express");

const controller = require("./controller");

const todoRouter = express.Router();

//CRUD API
todoRouter
  .get("/", controller.getUser)
  .get("/:id", controller.getUserById)
  .post("/", controller.CreatUser)
  .put("/:id", controller.updateUser)
  .delete("/:id", controller.deleteUser);

module.exports = todoRouter;