import React from "react";
import { Link } from "react-router-dom";
import "../styles/Header.css";

const Header = () => {
  return (
    <header className="nav navbar navbar-expand-lg">
      <div className="container">
        <Link className="navbar-brand textoNav" to="#">
          AMARANTA COMPLEMENTOS
        </Link>
        <div className="navbar-nav">
          <Link className="nav-link textoNav" to="/">
            Inicio
          </Link>
          <Link className="nav-link textoNav" to="/admin">
            Administrador
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
