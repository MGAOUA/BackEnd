const express = require("express");
const userRouter = require("./api/controllers/user/router");
const morgan = require("morgan"); // afficher la requete reçu
const helmet = require("helmet"); //cacher l'information de service used
const app = express();
app.use(express.json());
app.use(morgan("combined"));
app.use(helmet());
app.use("/user", userRouter);
//get post put path delete
//http:localhost:5000/users
//status
//100 :INFORMATIONS niveau physique

//200 :succes ,tout va bien
//300 : REDIRECTIONS
//400 :erreur coté client(front)
//500: erreur coté serveur (back)

//=========todo=============//
const todo = [
  {
    id: 1,
    task: "do somthing",
    completed: false,
  },
  {
    id: 2,
    task: "do somthing else",
    completed: true,
  },
];

app.get("/todo/:id", (req, res) => {
  const id = req.params.id;
  const todo1 = todo.find((e) => e.id == id);
  if (!todo1)
    return res.status(404).send({
      message: "task not found",
      data: {},
    });
  res.status(200).send({
    message: "correct",
    data: todo1,
  });
});

//post
app.post("/todo", (req, res) => {
  const newtask = {
    ...req.body,
    id: todo.length + 1,
  };
  todo.push(newtask);
  return res
    .status(200)
    .send({ message: "added succesfuly", newtask: newtask });
});
//put
app.put("/todo/:id", (req, res) => {
  const id = req.params.id;
  const indexofId = todo.findIndex((e) => e.id == id);
  if (indexofId < 0)
    return res.status(404).send({
      message: "elt not found",
      data: {},
    });
  console.log(" todo[indexofId]", todo[indexofId]);
  todo[indexofId] = {
    ...req.body,
    id: todo[indexofId].id,
  };
  res.status(201).send({ message: "task updated successfuly", data: {} });
});

app.delete("/todo/:id", (req, res) => {
  const id = req.params.id;
  const indexOfDel = todo.findIndex((e) => e.id == id);
  if (indexOfDel < 0)
    return res.status(404).send({
      message: "data not found",
      data: {},
    });
  todo.splice(indexOfDel, 1);

  res.status(200).send({
    message: "deleted successfuly",
    data: {},
  });
});

app.patch("/todo/:id", (req, res) => {
  const id = req.params.id;
  const indexOfPathT = todo.findIndex((e) => e.id == id);
  if (indexOfPathT < 0)
    return res.status(404).send({ message: "elt not found ", data: {} });
  todo[indexOfPathT] = {
    ...todo[indexOfPathT],
    completed: req.body.completed,
  };
  res.status(200).send({ message: "sucess", data: {} });
});

app.patch("/todo2/:id", (req, res) => {
  const action = req.query.action;
  const id = req.params.id;
  const indexOfPathT = todo.findIndex((e) => e.id == id);
  if (indexOfPathT < 0)
    return res.status(404).send({ message: "elt not found ", data: {} });
  switch (action) {
    case "done":
      {
        todo[indexOfPathT] = {
          ...todo[indexOfPathT],
          completed: true,
        };
      }
      break;
    case "undone":
      {
        todo[indexOfPathT] = {
          ...todo[indexOfPathT],
          completed: false,
        };
      }
      break;
    default:
      break;
  }

  res.status(200).send({ message: "sucess patch 2", data: todo[indexOfPathT] });
});

app.listen(5000, () => {
  console.log("listening on http://localhost:5000");
});
