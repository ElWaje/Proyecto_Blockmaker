import React from "react";
import { NavLink } from "react-router-dom";
import toast from "react-hot-toast";
import "./Navbar.css";

const Navbar = () => {
  // Función para mostrar un toast
  const handleClick = (message) => {
    toast(message, {
      icon: "👋",
    });
  };

  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li
          className="navbar-item"
          onClick={() => handleClick("Navegando a Inicio")}
        >
          <NavLink to="/" activeClassName="active">
            Inicio
          </NavLink>
        </li>
        <li
          className="navbar-item"
          onClick={() => handleClick("Navegando a Préstamos")}
        >
          <NavLink to="/prestamos" activeClassName="active">
            Préstamos
          </NavLink>
        </li>
        <li
          className="navbar-item"
          onClick={() => handleClick("Navegando a Gestión")}
        >
          <NavLink to="/gestion" activeClassName="active">
            Gestión
          </NavLink>
        </li>        
      </ul>
    </nav>
  );
};

export default Navbar;
