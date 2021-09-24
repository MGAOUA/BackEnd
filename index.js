const express = require("express");
const userRouter = require("./api/controllers/user/router");
const todoBDDRouter = require("./api/controllers/todoBDD/router");

const morgan = require("morgan"); // afficher la requete reçu
const helmet = require("helmet"); //cacher l'information de service used
const mongoose = require("mongoose");
const db = mongoose.connection;

db.once("open", () => console.log("database connected "));
mongoose.connect("mongodb://localhost:27017/myfirstBase", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

const app = express();
app.use(express.json());
app.use(morgan("combined"));

app.use(helmet());
app.use("/user", userRouter);
app.use("/todoBDD", todoBDDRouter);
//get post put path delete
//http:localhost:5000/users
//status
//100 :INFORMATIONS niveau physique

//200 :succes ,tout va bien
//300 : REDIRECTIONS
//400 :erreur coté client(front)
//500: erreur coté serveur (back)

app.listen(5000, () => {
  console.log("listening on http://localhost:5000");
});
