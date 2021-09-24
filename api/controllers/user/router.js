const express = require("express");

const controller = require("./controller");
const hourMidlleWare = require("../../../midlewares/hourMiddleWare");
const userRouter = express.Router();
const validator = require("../../../validator/user");
//CRUD API
userRouter
  .get("/", hourMidlleWare.verifyMorning, controller.getUser)
  //.get("/:id", controller.getUserById)
  .get("/:id", controller.getUserByIdFromBDD)
  .post("/", validator.validatePost, controller.CreatUser)
  //.put("/:id", controller.updateUser)
  .put("/:id", validator.validatePut, controller.UpdateUserFormBdd)
  //.delete("/:id", controller.deleteUser);
  .delete("/:id", controller.deleteUserFromBdd);

module.exports = userRouter;
