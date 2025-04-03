import React from "react";
import "../styles/Home.css";
import prod1 from "../assets/producto1.jpg";
import prod2 from "../assets/producto2.jpg";
import prod3 from "../assets/producto3.jpg";
import prod4 from "../assets/producto4.jpg";
import prod5 from "../assets/producto5.jpg";
import prod6 from "../assets/producto6.jpg";

const productos = [
  {
    id: 1,
    nombre: "prod1",
    descripcion: "descp1",
    imagen: prod1,
  },
  {
    id: 2,
    nombre: "prod2",
    descripcion: "descp2",
    imagen: prod2,
  },
  {
    id: 3,
    nombre: "prod3",
    descripcion: "descp3",
    imagen: prod3,
  },
  {
    id: 4,
    nombre: "prod4",
    descripcion: "descp4",
    imagen: prod4,
  },
  {
    id: 5,
    nombre: "prod5",
    descripcion: "descp5",
    imagen: prod5,
  },
  {
    id: 6,
    nombre: "prod6",
    descripcion: "descp6",
    imagen: prod6,
  },
];

const Home = () => {
  return (
    <div className="home-container">
      {/* Header */}
      <header className="nav navbar navbar-expand-lg">
        <div className="container">
          <a className="navbar-brand textoNav" href="#">
            AMARANTA COMPLEMENTOS
          </a>
          <div className="navbar-nav">
            <a className="nav-link textoNav" href="/">
              Inicio
            </a>
            <a className="nav-link textoNav" href="/admin">
              Administrador
            </a>
          </div>
        </div>
      </header>

      {/* Banner */}
      <div className="banner"></div>

      {/* Grid de productos */}
      <div className="container mt-4">
        <div className="row">
          {productos.map((producto) => (
            <div key={producto.id} className="col-md-4 mb-4">
              <div className="card product-card cardProducto">
                <img
                  src={producto.imagen}
                  className="card-img-top"
                  alt={producto.nombre}
                />
                <div className="card-body">
                  <h5 className="card-title">{producto.nombre}</h5>
                  <p className="card-text">{producto.descripcion}</p>
                  <button className="btn btn-primary boton">Ver más</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div>
        <footer></footer>
      </div>
    </div>
  );
};

export default Home;
