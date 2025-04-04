import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setProducts } from "../redux/productReducer";

function Admin() {
  const dispatch = useDispatch();
  const productos = useSelector((state) => state.productos.products);

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    image: ""
  });

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:3001/products");
      dispatch(setProducts(res.data));
    } catch (error) {
      console.error("Error al cargar productos:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newProduct = {
      ...form,
      price: parseFloat(form.price)
    };

    try {
      const res = await axios.post("http://localhost:3001/products", newProduct);
      dispatch(setProducts([...productos, res.data])); // actualizamos el estado global
      setForm({ name: "", description: "", price: "", image: "" }); // limpiamos el form
    } catch (error) {
      console.error("Error al agregar producto:", error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Administrador de Productos</h2>

      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          name="name"
          placeholder="Nombre"
          value={form.name}
          onChange={handleChange}
          className="form-control mb-2"
          required
        />
        <input
          type="text"
          name="description"
          placeholder="Descripción"
          value={form.description}
          onChange={handleChange}
          className="form-control mb-2"
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Precio"
          value={form.price}
          onChange={handleChange}
          className="form-control mb-2"
          required
        />
        <input
          type="text"
          name="image"
          placeholder="URL de imagen"
          value={form.image}
          onChange={handleChange}
          className="form-control mb-2"
        />
        <button type="submit" className="btn btn-primary">Agregar Producto</button>
      </form>

      <h3>Productos Actuales</h3>
      <div className="row">
        {productos.map((prod) => (
          <div key={prod.id} className="col-md-4 mb-3">
            <div className="card">
              <img src={prod.image} alt={prod.name} className="card-img-top" />
              <div className="card-body">
                <h5 className="card-title">{prod.name}</h5>
                <p className="card-text">{prod.description}</p>
                <p className="card-text">${prod.price}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Admin;
