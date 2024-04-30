import "./App.css";
import { useState } from "react";
import Axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [nombre, setNombre] = useState("");
  const [edad, setEdad] = useState();
  const [pais, setPais] = useState("");
  const [cargo, setCargo] = useState("");
  const [fecha, setFecha] = useState("");
  const [editar, setEditar] = useState(false);
  const [id, setId] = useState("");

  const [empleadosList, setEmpleados] = useState([]);

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
  const update = () => {
    Axios.put("http://localhost:3001/update", {
      id: id,
      nombre: nombre,
      edad: edad,
      pais: pais,
      cargo: cargo,
      fecha: fecha,
    }).then(() => {
      getEmpleados();
      alert("Usuario actualizado");
    });
  }
  const editarEmpleado = (val) => {
    setEditar(true);
    setNombre(val.nombre);
    setEdad(val.edad);
    setPais(val.pais);
    setCargo(val.cargo);
    setFecha(val.fecha);
    setId(val.id);
  }
  const getEmpleados = () => {
    Axios.get("http://localhost:3001/empleados").then((response) => {
      setEmpleados(response.data);
    });
  };

  return (
    <div className="container">
      <div className="card text-center">
        <div className="card-header">
          Gestión de empleados
        </div>
        <div className="card-body">
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Nombre:</span>
            <input type="text"
              onChange={(event) => {
                setNombre(event.target.value);
              }}
              className="form-control" value={nombre} placeholder="Ingrese nombre" aria-label="Username" aria-describedby="basic-addon1" />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Edad:</span>
            <input type="number"
              onChange={(event) => {
                setEdad(event.target.value);
              }}
              className="form-control" value={edad} placeholder="Ingrese Edad" aria-label="Username" aria-describedby="basic-addon1" />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Pais:</span>
            <input type="text"
              onChange={(event) => {
                setPais(event.target.value);
              }}
              className="form-control" value={pais} placeholder="Ingrese Pais" aria-label="Username" aria-describedby="basic-addon1" />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Cargo:</span>
            <input type="text"
              onChange={(event) => {
                setCargo(event.target.value);
              }}
              className="form-control" value={cargo} placeholder="Ingrese Cargo" aria-label="Username" aria-describedby="basic-addon1" />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Fecha:</span>
            <input type="text"
              onChange={(event) => {
                setFecha(event.target.value);
              }}
              className="form-control" value={fecha} placeholder="Ingrese Fecha" aria-label="Username" aria-describedby="basic-addon1" />
          </div>
        </div>
        <div className="card-footer text-body-secondary">
          {
            editar?
            <div>
              <button onClick={update} className="btn btn-warning m-2" >Actualizar</button>
              <button onClick={add} className="btn btn-info m-2">Cancelar</button>
            </div>
            :<button onClick={add} className="btn btn-success m-2">Registrar</button>
          }
          <button onClick={getEmpleados} className="btn btn-primary m-2">Listar</button>
        </div>
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nombre</th>
            <th scope="col">Edad</th>
            <th scope="col">Pais</th>
            <th scope="col">Cargo</th>
            <th scope="col">Fecha</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {
            empleadosList.map((val, key) => {
              return <tr key={val.id}>
                <th> {val.id}</th>
                <td> {val.nombre}</td>
                <td> {val.edad}</td>
                <td> {val.pais}</td>
                <td> {val.cargo}</td>
                <td> {val.fecha}</td>
                <td>
                  <div className="btn-group" role="group" aria-label="Basic example">
                    <button type="button"
                      onClick={() => {
                        editarEmpleado(val)
                      }}
                      className="btn btn-info">Editar</button>
                    <button type="button" className="btn btn-danger">Eliminar</button>
                  </div>
                </td>

              </tr>
            })
          }
        </tbody>
      </table>

    </div>
  );
}

export default App;
