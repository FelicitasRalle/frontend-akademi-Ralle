import React from "react";
import "../styles/Home.css";
import prod1 from "../assets/producto1.jpg";
import prod2 from "../assets/producto2.jpg";
import prod3 from "../assets/producto3.jpg";
import prod4 from "../assets/producto4.jpg";
import prod5 from "../assets/producto5.jpg";
import prod6 from "../assets/producto6.jpg";

const images = [prod1, prod2, prod3, prod4, prod5, prod6];

const Home = () => {
  return (
    <div className="home-container">
      {/* aqui va el header */}
      <header className=" nav navbar navbar-expand-lg">
        <div className="container">
          <a className="navbar-brand textoNav" href="#">
            Feli Shop
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

      {/* aqui va el banner */}
      <div className="banner"></div>

      {/* aqui empieza el grid de productos */}
      <div className="container mt-4">
        <div className="row">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="col-md-4 mb-4">
              <div className="card product-card">
                <img
                  src={images[index]} // Aquí reemplazas la URL por el array de imágenes
                  className="card-img-top"
                  alt={`Producto ${index + 1}`}
                />
                <div className="card-body">
                  <h5 className="card-title">Producto {index + 1}</h5>
                  <p className="card-text">Descripción breve del producto.</p>
                  <button className="btn btn-primary">Ver más</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* aqui va el footer */}
    </div>
  );
};

export default Home;
