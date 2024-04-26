import "./App.css";
import { useState } from "react";
import Axios from "axios";

function App() {
  const [nombre, setNombre] = useState("");
  const [edad, setEdad] = useState(0);
  const [pais, setPais] = useState("");
  const [cargo, setCargo] = useState("");
  const [fecha, setFecha] = useState("");

  const [empleadosList,setEmpleados] = useState([]);

  const add = () => {
    Axios.post("http://localhost:3001/create", {
      nombre: nombre,
      edad: edad,
      pais: pais,
      cargo: cargo,
      fecha: fecha,
    }).then(() => {
      getEmpleados();
      alert("Empleado registrado");
    });
  }
  const getEmpleados = () => {
    Axios.get("http://localhost:3001/empleados").then((response) => {
      setEmpleados(response.data);
    });
  };
  return (
    <div className="App">
      <div className="datos">
        <label>
          Nombre:
          <input
            type="text"
            onChange={(event) => {
              setNombre(event.target.value);
            }}
          />
        </label>
        <br />
        <label>
          Edad:
          <input
            type="text"
            onChange={(event) => {
              setEdad(event.target.value);
            }}
          />
        </label>
        <br />
        <label>
          Pais:
          <input
            type="text"
            onChange={(event) => {
              setPais(event.target.value);
            }}
          />
        </label>
        <br />
        <label>
          Cargo:
          <input
            type="text"
            onChange={(event) => {
              setCargo(event.target.value);
            }}
          />
        </label>
        <br />
        <label>
          Fecha:
          <input
            type="date"
            onChange={(event) => {
              setFecha(event.target.value);
            }}
          />
        </label>
        <button onClick={add}>Registrar</button>
      </div>
      <div className="lista">
        <button onClick={getEmpleados}>Listar</button>
        {
          empleadosList.map((val,key)=>{
            return <div className=""> {val.nombre} </div>
          })
        }
      </div>
    </div>
  );
}

export default App;
