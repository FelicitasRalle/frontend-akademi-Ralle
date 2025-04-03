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
    }
};

export default Admin;