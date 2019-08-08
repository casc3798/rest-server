//  La carpeta Routes tambien es llamada controladores
const express = require("express");
const bcrypt = require("bcrypt");
//  Potencia javascript, le anade funcionalidades
const _ = require("underscore");
const Usuario = require("../models/usuario");
const app = express();

app.get("/usuario", function(req, res) {
  Usuario.find({}).exec();
});

app.post("/usuario", function(req, res) {
  //  Aparece gracias al bodyParser
  let body = req.body;
  // Creando una instancia del esquema Usuario
  let usuario = new Usuario({
    nombre: body.nombre,
    email: body.email,
    password: bcrypt.hashSync(body.password, 10),
    role: body.role
  });

  usuario.save((err, usuarioDB) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err
      });
    }
    //  usuarioDB.password = null;
    res.json({ ok: true, usuario: usuarioDB });
  });
});

app.put("/usuario/:id", function(req, res) {
  //  Obtiene el id de la ruta ( :id )
  let id = req.params.id;

  //  Pick selecciona los valores que yo quiero de un objeto,
  //  es una funcion del underscore
  let body = _.pick(req.body, ["nombre", "email", "img", "role", "estado"]);

  Usuario.findByIdAndUpdate(
    id,
    body,
    { new: true, runValidators: true },
    (err, usuarioDB) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          err
        });
      }
      res.json({ ok: true, usuario: usuarioDB });
    }
  );
});

app.delete("/usuario", function(req, res) {
  res.json("delete Usuario");
});

module.exports = app;
