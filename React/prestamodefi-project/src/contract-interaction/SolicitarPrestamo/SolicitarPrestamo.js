import React, { useState } from "react";
import { ethers } from "ethers";
import { toast } from "react-hot-toast";
import "./SolicitarPrestamo.css";
import {
  contratoPrestamoDeFiAddress,
  contratoPrestamoDeFiABI,
} from "../../ContratoConfig";

const SolicitarPrestamo = ({ signer }) => {
  const [monto, setMonto] = useState("");
  const [plazo, setPlazo] = useState("");

  const solicitarPrestamo = async () => {
    if (!signer) {
      toast.error("Por favor, conecta tu wallet primero.");
      return;
    }
    if (!monto || isNaN(monto) || !plazo || isNaN(plazo)) {
      toast.error("Por favor, ingresa un monto y plazo válidos.");
      return;
    }

    try {
      const contrato = new ethers.Contract(
        contratoPrestamoDeFiAddress,
        contratoPrestamoDeFiABI,
        signer
      );
      const tx = await contrato.solicitarPrestamo(
        ethers.utils.parseEther(monto),
        parseInt(plazo)
      );
      await tx.wait();
      toast.success("Solicitud de préstamo enviada con éxito.");
    } catch (error) {
      console.error("Error al solicitar el préstamo:", error);
      toast.error(
        "Error en la solicitud. " +
          (error.message || "Verifique la consola para más detalles.")
      );
    }
  };

  return (
    <div className="solicitar-prestamo">
      <input
        type="text"
        value={monto}
        onChange={(e) => setMonto(e.target.value)}
        placeholder="Monto en ETH"
      />
      <input
        type="number"
        value={plazo}
        onChange={(e) => setPlazo(e.target.value)}
        placeholder="Plazo en días"
      />
      <button onClick={solicitarPrestamo}>Solicitar Préstamo</button>
    </div>
  );
};

export default SolicitarPrestamo;
