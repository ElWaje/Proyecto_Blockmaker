import React, { useState } from "react";
import { ethers } from "ethers";
import toast from "react-hot-toast";
import "./ReembolsarPrestamo.css";
import {
  contratoPrestamoDeFiAddress,
  contratoPrestamoDeFiABI,
} from "../../ContratoConfig";

const ReembolsarPrestamo = ({ signer }) => {
  const [prestamoId, setPrestamoId] = useState("");

  const reembolsarPrestamo = async () => {
    if (!signer) {
      toast.error("Por favor, conecta tu wallet primero.");
      return;
    }
    if (!prestamoId) {
      toast.error("Por favor, ingresa un ID de préstamo válido.");
      return;
    }

    try {
      const contrato = new ethers.Contract(
        contratoPrestamoDeFiAddress,
        contratoPrestamoDeFiABI,
        signer
      );
      const tx = await contrato.reembolsarPrestamo(prestamoId);
      await tx.wait();
      toast.success("Préstamo reembolsado con éxito.");
    } catch (error) {
      console.error("Error al reembolsar el préstamo:", error);
      toast.error(
        "Error en el reembolso. " +
          (error.message || "Verifique la consola para más detalles.")
      );
    }
  };

  return (
    <div className="reembolsar-prestamo">
      <input
        type="text"
        value={prestamoId}
        onChange={(e) => setPrestamoId(e.target.value)}
        placeholder="ID del Préstamo"
      />
      <button onClick={reembolsarPrestamo}>Reembolsar Préstamo</button>
    </div>
  );
};

export default ReembolsarPrestamo;
