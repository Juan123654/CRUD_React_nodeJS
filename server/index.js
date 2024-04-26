const express = require("express");
const app = express();
const mysql = require("mysql2");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "admin",
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

app.listen(3001, () => {
  console.log("Servidor escuchando en el puerto 3001");
});
