import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import stylesheet from "../styles/ProductDetail.css";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:3001/products/${id}`);
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Error al cargar el producto:", error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return <div className="text-center mt-5">Cargando detalle del producto...</div>;
  }

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div className="card p-4 shadow-lg" style={{ maxWidth: "600px", width: "100%", borderRadius: "20px" }}>
        <img
          src={product.image}
          alt={product.name}
          className="card-img-top mb-3"
          style={{ objectFit: "contain", maxHeight: "400px", width: "100%" }}
        />
        <div className="card-body text-center">
          <h2 className="card-title tituloCard">{product.name}</h2>
          <p className="card-text fs-5 text-muted">${product.price}</p>
          <p className="card-text">{product.description}</p>
          <div className="mt-3">
            <Link to="/" className="btn btnVolver">Volver al inicio</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;


