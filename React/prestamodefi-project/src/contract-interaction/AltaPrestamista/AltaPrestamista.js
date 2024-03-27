import React, { useState } from "react";
import { ethers } from "ethers";
import { useToasts } from "react-hot-toast";
import "./AltaPrestamista.css";
import {
  contratoPrestamoDeFiAddress,
  contratoPrestamoDeFiABI,
} from "../../ContratoConfig";

const AltaPrestamista = ({ providerOrSigner }) => {
  const [estado, setEstado] = useState("");
  const { success, error } = useToasts();

  const registrarPrestamista = async () => {
    if (!providerOrSigner) {
      setEstado("Por favor, conecta tu wallet primero.");
      return;
    }

    try {
      const contrato = new ethers.Contract(
        contratoPrestamoDeFiAddress,
        contratoPrestamoDeFiABI,
        providerOrSigner
      );
      const transactionResponse = await contrato.altaPrestamista();
      await providerOrSigner.waitForTransaction(transactionResponse.hash);
      success("Registro exitoso. Ahora eres un prestamista en el sistema."); // Muestra una notificación de éxito
    } catch (error) {
      console.error("Error al intentar registrar el prestamista:", error);
      error(
        typeof error === "string"
          ? error
          : error.message || "Error desconocido."
      );
    }
  };

  return (
    <div className="alta-prestamista">
      <button onClick={registrarPrestamista}>
        Registrarme como Prestamista
      </button>
      {estado && <p>{estado}</p>}
    </div>
  );
};

export default AltaPrestamista;
