import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProduct, addProducts, deleteProduct } from "../redux/actions/productActions";
import "../styles/Admin.css";

const Admin = () =>{
    //envio las acciones de redux (importante!) y obtengo la lista deproductos
    const dispatch = useDispatch();
    const productos = useSelector((state) => state.productos);

    //manejar las acciones del formulario para el ABM
    const [newProduct, setNewProduct] = useState({nombre: "", descripcion: "", imagen: ""});
    //empieza en false ya q esta en un producto nuevo, el true es cuando paso a editr
    const [editMode, setEditMode] = useState(false);
    const [editId, setEditId] = useState(null);

    //actualizar un producto cuando el user escribe en los inputs
    const handleChange = (e) =>{
        setNewProduct({...newProduct, [e.target.name]: e.target.value});
    };

    //envio del formulario
    const handleSubmit = (e) =>{
        e.preventDefault();
        if(editMode){
            dispatch(updateProduct(editId, newProduct));
            setEditMode(false);
            setEditId(null);
        }else{
            dispatch(addProducts(newProduct));
        }
        setNewProduct({ nombre: "", descripcion: "", imagen: ""});
    };

    //editar un prod q ya existe
    const handleEdit = (producto) => {
        setNewProduct(producto);
        setEditMode(true);
        setEditId(producto.id);
    };

    return (
        <div className="admin-container">
          <h2>Administrador de Productos</h2>
          <form onSubmit={handleSubmit} className="product-form">
            <input type="text" name="nombre" value={newProduct.nombre} onChange={handleChange} placeholder="Nombre" required />
            <input type="text" name="descripcion" value={newProduct.descripcion} onChange={handleChange} placeholder="Descripción" required />
            <input type="text" name="imagen" value={newProduct.imagen} onChange={handleChange} placeholder="URL de la imagen" required />
            <button type="submit">{editMode ? "Actualizar" : "Agregar"}</button>
          </form>
          <div className="product-list">
            {productos.map((producto) => (
              <div key={producto.id} className="product-item">
                <img src={producto.imagen} alt={producto.nombre} />
                <h4>{producto.nombre}</h4>
                <p>{producto.descripcion}</p>
                <button onClick={() => handleEdit(producto)}>Editar</button>
                <button onClick={() => dispatch(deleteProduct(producto.id))}>Eliminar</button>
              </div>
            ))}
          </div>
        </div>
      );
};

export default Admin;