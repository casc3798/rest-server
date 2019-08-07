//  Primero se lee este archivo y lo ejecuta
require("./config/config");
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const bodyParser = require("body-parser");

// Todas las app.use son middlewares, todas las peticiones que
// se hacen pasan primero por esas lineas
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

//  Importando las rutas del usuario
app.use(require("./routes/usuario"));

//  Aunque la base de datos no exista, mongoose crea toda
//  la estructura necesaria para funcionar
mongoose.connect(
  "mongodb://localhost:27017/cafe",
  {
    useNewUrlParser: true
  },
  err => {
    if (err) throw err;
    console.log("Base de datos ONLINE");
  }
);

app.listen(process.env.PORT, () =>
  console.log("Escuchando puerto ", process.env.PORT)
);
