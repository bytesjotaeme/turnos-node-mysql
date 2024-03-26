const express = require("express");
const app = express();
const mysql = require("mysql2");
const cors = require("cors");
const bcrypt = require("bcrypt");
const res = require("express/lib/response");
const saltRounds = 10;
const { Sequelize } = require('sequelize');
const bodyParser = require('body-parser');

{/*conexion */}
//Creación de la conexión a la base de datos MySQL con el paquete mysql2
const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "login_node_jwt",
});

//Uso de middlewares para analizar el cuerpo JSON de las solicitudes y gestionar CORS
app.use(express.json());
app.use(cors());

//Endpoint para el registro de usuarios

app.post("/register", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

    //Consulta para verificar si el email ya está en uso

  db.query("SELECT * FROM usuarios WHERE email = ?", [email], (err, result) => {
    if (err) {
      res.send(err);
    }
     //Si no hay un usuario con ese email, encriptamos la contraseña y registramos al usuario
    if (result.length == 0) {
      bcrypt.hash(password, saltRounds, (err, hash) => {
        db.query(
          "INSERT INTO usuarios (email, password) VALUE (?,?)",
          [email, hash],
          (error, response) => {
            if (err) {
              res.send(err);
            }

            res.send({ msg: "Usuario registrado correctamente" });
          }
        );
      });
    } else {
      res.send({ msg: "Correo electrónico ya registrado" });
    }
  });
});

{/*Verificacion de login*/}
//Endpoint para verificar el inicio de sesión del usuario

app.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

 //Consulta para obtener el usuario con el email proporcionado

  db.query("SELECT * FROM usuarios WHERE email = ?", [email], (err, result) => {
    if (err) {
      res.send(err);
    }
     //Si hay un usuario con ese email, comparamos la contraseña proporcionada con la almacenada en la DB
    if (result.length > 0) {
      bcrypt.compare(password, result[0].password, (error, response) => {
        if (error) {
          res.send(error);
        }
        if (response === true) {
          res.send(response)
          
        } else {
          res.send({ msg: "Correo o contraseña incorrecta" });
        }
      });
    } else {
      res.send({ msg: "Usuario no registrado" });
    }
  });
});

//turnos
 
app.use(cors());
app.use(bodyParser.json());

// Obtener todos los turnos
app.get('/turnos', (req, res) => {
  db.query('SELECT * FROM turnos', (error, results) => {
      if (error) throw error;
      res.send(results);
  });
});

// Agregar un nuevo turno
app.post('/turnos', (req, res) => {
  const { cliente, apellido, celular, mensaje, fecha, hora, servicio } = req.body;
  const query = 'INSERT INTO turnos (cliente, apellido, celular, mensaje, fecha, hora, servicio) VALUES (?, ?, ?, ?, ?, ?, ?)';
  db.query(query, [cliente, apellido, celular, mensaje, fecha, hora, servicio], (error) => {
      if (error) throw error;
      res.send({ status: 'Turno agregado' });
  });
});

// Actualizar un turno existente
app.put('/turnos/:id', (req, res) => {
  const { cliente, apellido, celular, mensaje, fecha, hora, servicio } = req.body;
  const query = 'UPDATE turnos SET cliente = ?, apellido = ?, celular = ?, mensaje = ?, fecha = ?, hora = ?, servicio = ? WHERE id = ?';
  db.query(query, [cliente, apellido, celular, mensaje, fecha, hora, servicio, req.params.id], (error) => {
      if (error) throw error;
      res.send({ status: 'Turno actualizado' });
  });
});

// Eliminar un turno
app.delete('/turnos/:id', (req, res) => {
  const query = 'DELETE FROM turnos WHERE id = ?';
  db.query(query, [req.params.id], (error) => {
      if (error) throw error;
      res.send({ status: 'Turno eliminado' });
  });
});





//inicia el servidor en el puerto 3001
app.listen(3001, () => {
  console.log("andando en el puerto 3001");
});

