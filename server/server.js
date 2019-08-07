//  Primero se lee este archivo y lo ejecuta
require("./config/config");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");

// Todas las app.use son middlewares, todas las peticiones que
// se hacen pasan primero por esas lineas
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.get("/usuario", function(req, res) {
  res.json("get Usuario");
});

app.post("/usuario", function(req, res) {
  //  Aparece gracias al bodyParser
  let body = req.body;

  if (body.nombre === undefined) {
    res.status(400).json({
      ok: false,
      mensaje: "El nombre es necesario"
    });
  } else {
    res.json({
      persona: body
    });
  }
});

app.put("/usuario/:id", function(req, res) {
  //  Obtiene el id de la ruta ( :id )
  let id = req.params.id;
  res.json({ id });
});

app.delete("/usuario", function(req, res) {
  res.json("delete Usuario");
});

app.listen(process.env.PORT, () =>
  console.log("Escuchando puerto ", process.env.PORT)
);
