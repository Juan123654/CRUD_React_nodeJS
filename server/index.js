const express = require("express");
const app = express();
const mysql = require("mysql2");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "12345678", //12345678 local casa, admin local trabajo
  database: "empleados_crud",
});

db.connect((err) => {
  if (err) {
    console.error("Error al conectar a la base de datos: ", err);
  } else {
    console.log("Conexión exitosa a la base de datos");
  }
});

app.post("/create", (req, res) => {
  const { nombre, edad, pais, cargo, fecha } = req.body;

  db.query(
    "INSERT INTO empleados (nombre, edad, pais, cargo, fecha) VALUES (?, ?, ?, ?, ?)",
    [nombre, edad, pais, cargo, fecha],
    (err, result) => {
      if (err) {
        console.error("Error al registrar el empleado: ", err);
        res.status(500).send("Error al registrar el empleado");
      } else {
        console.log("Empleado registrado con éxito");
        res.status(200).send("Empleado registrado con éxito");
      }
    }
  );
});

app.get("/empleados", (req, res) => {
  db.query(
    "SELECT * FROM empleados",
    (err, result) => {
      if (err) {
        console.error(err);
        
      } else {
        res.send(result)
      }
    }
  );
});

app.put("/update", (req, res) => {
  const { id, nombre, edad, pais, cargo, fecha } = req.body;

  db.query(
    "UPDATE empleados SET nombre= ?, edad = ?, pais = ?, cargo = ?, fecha = ?) WHERE id = ?",
    [nombre, edad, pais, cargo, fecha,id],
    (err, result) => {
      if (err) {
        console.error("Error al Actualizado el empleado: ", err);
        res.status(500).send("Error al Actualizado el empleado");
      } else {
        console.log("Empleado Actualizado con éxito");
        res.status(200).send("Empleado Actualizado con éxito");
      }
    }
  );
});

app.listen(3001, () => {
  console.log("Servidor escuchando en el puerto 3001");
});
