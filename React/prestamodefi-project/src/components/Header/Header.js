import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import ConnectWallet from "../ConnectWallet/ConnectWallet";
import "./Header.css";
import toast from "react-hot-toast";
import logo from "../../assets/logo.png";

const Header = () => {
  useEffect(() => {
    // Muestra un toast de bienvenida al cargar el componente
    toast.success("Bienvenido a nuestra aplicación DeFi!", {
      duration: 4000,
      position: "top-right",
    });
  }, []);

  const handleLogoClick = () => {
    // Muestra un toast al hacer clic en el logo
    toast("¡Explorando Inicio!", {
      icon: "🏠",
    });
  };

  return (
    <header className="header">
      <div className="container">
        <Link to="/" className="logo-link" onClick={handleLogoClick}>
          <img src={logo} alt="Logo" className="logo" />
        </Link>
        <Navbar />
        <ConnectWallet />
      </div>
    </header>
  );
};

export default Header;
