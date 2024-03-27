import React, { useState } from "react";
import { ethers } from "ethers";
import { useToasts } from "react-hot-toast";
import "./DetallesPrestamo.css";
import {
  contratoPrestamoDeFiAddress,
  contratoPrestamoDeFiABI,
} from "../../ContratoConfig";

// Componente para consultar los detalles de un préstamo específico
const DetallesPrestamo = ({ signer }) => {
  const [prestamoId, setPrestamoId] = useState("");
  const [detallesPrestamo, setDetallesPrestamo] = useState(null);
  const { error } = useToasts();

  // Función para cargar los detalles de un préstamo específico
  const cargarDetallesPrestamo = async () => {
    if (!signer) {
      error("Conecta tu wallet para continuar.");
      return;
    }

    try {
      const contrato = new ethers.Contract(
        contratoPrestamoDeFiAddress,
        contratoPrestamoDeFiABI,
        signer
      );
      const detalles = await contrato.obtenerDetalleDePrestamo(
        signer.getAddress(),
        prestamoId
      );
      setDetallesPrestamo(detalles);
    } catch (error) {
      error("Error al obtener los detalles del préstamo.");
    }
  };

  return (
    <div className="detalles-prestamo">
      <input
        type="text"
        value={prestamoId}
        onChange={(e) => setPrestamoId(e.target.value)}
        placeholder="ID del Préstamo"
      />
      <button onClick={cargarDetallesPrestamo}>Cargar Detalles</button>
      {detallesPrestamo && (
        <div>{/* Muestra los detalles del préstamo aquí */}</div>
      )}
    </div>
  );
};

export default DetallesPrestamo;
