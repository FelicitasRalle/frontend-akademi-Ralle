import React from "react";
import "../styles/Footer.css";
import logo from "../images/logo.jpg"

const Footer = () => {
  return (
    <footer className="text-center py-3 footer">
      <p className="textoNav">© 2025 AMARANTA COMPLEMENTOS</p>
      <img
      src = {logo}
      alt="Logo Amaranta"
      className="logo" />
    </footer>
  );
};

export default Footer;