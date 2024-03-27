import React, { useState } from "react";
import { ethers } from "ethers";
import { useToasts } from "react-hot-toast";
import "./LiquidarGarantia.css";
import {
  contratoPrestamoDeFiAddress,
  contratoPrestamoDeFiABI,
} from "../../ContratoConfig";

const LiquidarGarantia = ({ signer }) => {
  const [prestamoId, setPrestamoId] = useState("");
  const [estado, setEstado] = useState("");
  const { error, success } = useToasts();

  const liquidarGarantia = async () => {
    if (!signer) {
      error("Por favor, conecta tu wallet primero.");
      return;
    }
    if (!prestamoId) {
      error("Por favor, ingresa un ID de préstamo válido.");
      return;
    }

    try {
      const contrato = new ethers.Contract(
        contratoPrestamoDeFiAddress,
        contratoPrestamoDeFiABI,
        signer
      );
      const tx = await contrato.liquidarGarantia(prestamoId);
      await tx.wait();
      success("Garantía liquidada con éxito.");
    } catch (error) {
      console.error("Error al liquidar garantía:", error);
      error(
        "Error en la liquidación. " +
          (error.message || "Verifique la consola para más detalles.")
      );
    }
  };

  return (
    <div className="liquidar-garantia">
      <input
        type="text"
        value={prestamoId}
        onChange={(e) => setPrestamoId(e.target.value)}
        placeholder="ID del Préstamo"
      />
      <button onClick={liquidarGarantia}>Liquidar Garantía</button>
      <p>{estado}</p>
    </div>
  );
};

export default LiquidarGarantia;
