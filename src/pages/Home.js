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
  const [paginaActual, setPaginaActual] = useState(1);
  const productosPorPagina = 6;

  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then((res) => res.json())
      .then((data) => dispatch(setProducts(data)))
      .catch((err) => console.error("Error al cargar productos:", err));
  }, [dispatch]);

  const categorias = ["Todas", "vinchas", "coleros", "trabas"];

  const productosFiltrados = categoriaSeleccionada === "Todas"
    ? productos
    : productos.filter(
        (producto) => producto.category === categoriaSeleccionada
      );

  const indexUltimoProducto = paginaActual * productosPorPagina;
  const indexPrimerProducto = indexUltimoProducto - productosPorPagina;
  const productosPaginados = productosFiltrados.slice(indexPrimerProducto, indexUltimoProducto);
  const totalPaginas = Math.ceil(productosFiltrados.length / productosPorPagina);

  const cambiarPagina = (numero) => {
    setPaginaActual(numero);
  };

  return (
    <div className="home-container">
      <div
        className="banner"
        style={{ backgroundImage: `url(${bannerInicio})` }}
      ></div>

      <div className="container mt-4">
        <div className="d-flex justify-content-end mb-3">
          <select
            value={categoriaSeleccionada}
            onChange={(e) => {
              setCategoriaSeleccionada(e.target.value);
              setPaginaActual(1);
            }}
            className="form-select w-auto"
          >
            {categorias.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className="row">
          {productosPaginados && productosPaginados.length > 0 ? (
            productosPaginados.map((producto) => (
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

        {/* Paginación */}
        {totalPaginas > 1 && (
          <div className="d-flex justify-content-center mt-4">
            <nav>
              <ul className="pagination">
                {Array.from({ length: totalPaginas }, (_, i) => i + 1).map((num) => (
                  <li key={num} className={`page-item ${paginaActual === num ? "active" : ""}`}>
                    <button className="page-link" onClick={() => cambiarPagina(num)}>
                      {num}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;

