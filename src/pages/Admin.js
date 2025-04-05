import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setProducts } from "../redux/reducers/productReducer";
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import * as bootstrap from 'bootstrap';
import Header from "../components/Header";
import Footer from "../components/Footer";
import stylesheet from "../styles/Admin.css";

function Admin() {
  const dispatch = useDispatch();
  const productos = useSelector((state) => state.productos.products);
  const modalRef = useRef(null);

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
  });

  const [editando, setEditando] = useState(false);
  const [editId, setEditId] = useState(null);

  // 🔔 Mensaje de alerta
  const [alerta, setAlerta] = useState({ mensaje: "", tipo: "" });

  const mostrarAlerta = (mensaje, tipo = "success") => {
    setAlerta({ mensaje, tipo });
    setTimeout(() => {
      setAlerta({ mensaje: "", tipo: "" });
    }, 3000); // Oculta después de 3 segundos
  };

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
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newProduct = {
      ...form,
      price: parseFloat(form.price),
    };

    try {
      if (editando) {
        const res = await axios.put(
          `http://localhost:3001/products/${editId}`,
          newProduct
        );
        dispatch(
          setProducts(productos.map((p) => (p.id === editId ? res.data : p)))
        );
        setEditando(false);
        setEditId(null);

        const modal = bootstrap.Modal.getInstance(modalRef.current);
        modal.hide();

        mostrarAlerta("Producto editado correctamente ✅", "success");
      } else {
        const res = await axios.post(
          "http://localhost:3001/products",
          newProduct
        );
        dispatch(setProducts([...productos, res.data]));
        mostrarAlerta("Producto agregado correctamente ✅", "success");
        await fetchProducts();
      }

      setForm({ name: "", description: "", price: "", image: "" });
    } catch (error) {
      console.error("Error al enviar producto:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/products/${id}`);
      dispatch(setProducts(productos.filter((prod) => prod.id !== id)));
      mostrarAlerta("Producto eliminado correctamente 🗑️", "danger");
    } catch (error) {
      console.error("Error al eliminar producto: ", error);
    }
  };

  const handleEdit = (producto) => {
    setForm({
      name: producto.name,
      description: producto.description,
      price: producto.price,
      image: producto.image,
    });

    setEditando(true);
    setEditId(producto.id);

    const modal = new bootstrap.Modal(modalRef.current);
    modal.show();
  };

  return (
    <div className="container mt-4 contenedorForm">
      <h2 className="tituloAdmin">Administrador de Productos</h2>

      {/* 🔔 Alerta visible si hay mensaje */}
      {alerta.mensaje && (
        <div className={`alert alert-${alerta.tipo}`} role="alert">
          {alerta.mensaje}
        </div>
      )}

      {/* Formulario solo para agregar */}
      {!editando && (
        <form onSubmit={handleSubmit} className="mb-4">
          <input
            type="text"
            name="name"
            minLength={5}
            maxLength={30}
            placeholder="Nombre"
            value={form.name}
            onChange={handleChange}
            className="form-control mb-2"
            required
          />
          <input
            type="text"
            name="description"
            minLength={10}
            maxLength={50}
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
          <button type="submit" className="btn btnAgregar">
            Agregar Producto
          </button>
        </form>
      )}

      {/* MODAL para editar */}
      <div
        className="modal fade"
        ref={modalRef}
        tabIndex="-1"
        aria-labelledby="editModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <form onSubmit={handleSubmit}>
              <div className="modal-header">
                <h5 className="modal-title" id="editModalLabel">
                  Editar Producto
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Cerrar"
                ></button>
              </div>
              <div className="modal-body">
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
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Cancelar
                </button>
                <button type="submit" className="btn btn-success">
                  Guardar Cambios
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Lista de productos */}
      <h3 className="mt-4 tituloProd">Productos</h3>
      <div className="row">
        {productos.map((prod) => (
          <div key={prod.id} className="col-md-4 mb-3">
            <div className="card">
              <img src={prod.image} alt={prod.name} className="card-img-top" />
              <div className="card-body">
                <h5 className="card-title">{prod.name}</h5>
                <p className="card-text">{prod.description}</p>
                <p className="card-text">${prod.price}</p>

                <button
                  className="btn btnEditar btn-sm me-2"
                  onClick={() => handleEdit(prod)}
                >
                  Editar
                </button>
                <button
                  className="btn btnEliminar btn-sm"
                  onClick={() => handleDelete(prod.id)}
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Admin;


