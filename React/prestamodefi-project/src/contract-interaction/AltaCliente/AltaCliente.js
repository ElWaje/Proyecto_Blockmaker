import React, { useState } from "react";
import { ethers } from "ethers";
import { useToasts } from "react-hot-toast"; // Importa useToasts de React Hot Toast
import {
  contratoPrestamoDeFiAddress,
  contratoPrestamoDeFiABI,
} from "../../ContratoConfig";
import "./AltaCliente.css";

const AltaCliente = ({ signer }) => {
  const [estado, setEstado] = useState("");
  const { success, error } = useToasts(); // Usa useToasts para mostrar notificaciones

  const registrarCliente = async (address) => {
    if (!signer) {
      setEstado("Por favor, conecta tu wallet primero.");
      return;
    }

    try {
      const contrato = new ethers.Contract(
        contratoPrestamoDeFiAddress,
        contratoPrestamoDeFiABI,
        signer
      );
      const transaccion = await contrato.altaCliente(address);
      await transaccion.wait();
      success("Registro exitoso. Ahora eres un cliente en el sistema."); // Muestra una notificación de éxito
    } catch (error) {
      console.error("Error al registrar el cliente:", error);
      error(
        "Error en el registro. " +
          (error.message || "Verifique la consola para más detalles.")
      );
    }
  };

  return (
    <div className="alta-cliente">
      <button onClick={() => registrarCliente(signer.getAddress())}>
        Registrarme como Cliente
      </button>
      <p>{estado}</p>
    </div>
  );
};

export default AltaCliente;
