import React, { useEffect, useState } from "react";
import "../styles/Home.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../redux/reducers/productReducer";
import { Link } from "react-router-dom";
import bannerInicio from "../images/bannerInicio.png";

const Home = () => {
  const dispatch = useDispatch();
  const productos = useSelector((state) => state.productos.products);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("Todas");

  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then((res) => res.json())
      .then((data) => dispatch(setProducts(data)))
      .catch((err) => console.error("Error al cargar productos:", err));
  }, [dispatch]);

  const categorias = [
    "Todas",
    ...new Set(productos.map((producto) => producto.category)),
  ];

  const productosFiltrados =
    categoriaSeleccionada === "Todas"
      ? productos
      : productos.filter(
          (producto) => producto.category === categoriaSeleccionada
        );

  return (
    <div className="home-container">
      <div
        className="banner"
        style={{ backgroundImage: `url(${bannerInicio})` }}
      ></div>

      <div className="container mt-4">
        <div className="d-flex justify-content-end mb-3">
          <select
            className="form-select w-auto"
            value={categoriaSeleccionada}
            onChange={(e) => setCategoriaSeleccionada(e.target.value)}
          >
            {categorias.map((categoria, idx) => (
              <option key={idx} value={categoria}>
                {categoria}
              </option>
            ))}
          </select>
        </div>

        <div className="row">
          {productosFiltrados && productosFiltrados.length > 0 ? (
            productosFiltrados.map((producto) => (
              <div key={producto.id} className="col-md-4 mb-4">
                <div className="card product-card cardProducto">
                  <img
                    src={
                      producto.image || "https://via.placeholder.com/300x200"
                    }
                    className="card-img-top"
                    alt={producto.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{producto.name}</h5>
                    <p className="card-text">{producto.description}</p>
                    <Link
                      to={`/producto/${producto.id}`}
                      className="btn btn-primary boton"
                    >
                      Ver más
                    </Link>
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

