import React, { useState } from "react";
import { ethers } from "ethers";
import { useToasts } from "react-hot-toast";
import "./AprobarPrestamo.css";
import {
  contratoPrestamoDeFiAddress,
  contratoPrestamoDeFiABI,
} from "../../ContratoConfig";

const AprobarPrestamo = ({ providerOrSigner }) => {
  const [prestamoId, setPrestamoId] = useState("");
  const [prestatarioAddress, setPrestatarioAddress] = useState("");
  const { success, error } = useToasts();

  const aprobarPrestamo = async () => {
    if (!providerOrSigner) {
      error("Por favor, conecta tu wallet primero.");
      return;
    }

    try {
      const contrato = new ethers.Contract(
        contratoPrestamoDeFiAddress,
        contratoPrestamoDeFiABI,
        providerOrSigner
      );
      const transaccion = await contrato.aprobarPrestamo(
        prestatarioAddress,
        prestamoId
      );
      await transaccion.wait();
      success("Préstamo aprobado con éxito.");
    } catch (error) {
      console.error("Error al aprobar el préstamo:", error);
      error(
        "Error en la aprobación. " +
          (error.message || "Verifique la consola para más detalles.")
      );
    }
  };

  return (
    <div className="aprobar-prestamo">
      <input
        type="text"
        placeholder="ID del Préstamo"
        value={prestamoId}
        onChange={(e) => setPrestamoId(e.target.value)}
      />
      <input
        type="text"
        placeholder="Dirección del Prestatario"
        value={prestatarioAddress}
        onChange={(e) => setPrestatarioAddress(e.target.value)}
      />
      <button onClick={aprobarPrestamo}>Aprobar Préstamo</button>
    </div>
  );
};

export default AprobarPrestamo;
