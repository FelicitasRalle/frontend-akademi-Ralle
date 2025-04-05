// src/pages/Home.js
import React, { useEffect } from "react";
import "../styles/Home.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../redux/reducers/productReducer";

const Home = () => {
  const dispatch = useDispatch();
  const productos = useSelector((state) => state.productos.products);

  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then((res) => res.json())
      .then((data) => dispatch(setProducts(data)))
      .catch((err) => console.error("Error al cargar productos:", err));
  }, [dispatch]);

  return (
    <div className="home-container">
  
      <div className="banner"></div>

      <div className="container mt-4">
        <div className="row">
          {productos && productos.length > 0 ? (
            productos.map((producto) => (
              <div key={producto.id} className="col-md-4 mb-4">
                <div className="card product-card cardProducto">
                  <img
                    src={producto.image || "https://via.placeholder.com/300x200"}
                    className="card-img-top"
                    alt={producto.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{producto.name}</h5>
                    <p className="card-text">{producto.description}</p>
                    <button className="btn btn-primary boton">Ver más</button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>Cargando productos...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;



