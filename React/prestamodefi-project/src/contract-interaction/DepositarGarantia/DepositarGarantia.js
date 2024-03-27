import React, { useState } from "react";
import { ethers } from "ethers";
import { useToasts } from "react-hot-toast";
import "./DepositarGarantia.css";
import { contratoPrestamoDeFiAddress } from "../../ContratoConfig";

const DepositarGarantia = ({ signer }) => {
  const [monto, setMonto] = useState("");
  const { success, error } = useToasts();

  const depositarGarantia = async () => {
    if (!signer) {
      error("Por favor, conecta tu wallet primero.");
      return;
    }
    if (!monto || isNaN(monto)) {
      error("Por favor, ingresa un monto válido.");
      return;
    }

    try {
      const tx = {
        to: contratoPrestamoDeFiAddress,
        value: ethers.utils.parseEther(monto),
      };
      const transactionResponse = await signer.sendTransaction(tx);
      await transactionResponse.wait();
      success("Depósito de garantía exitoso.");
    } catch (error) {
      console.error("Error al depositar garantía:", error);
      error(
        "Error en el depósito. " +
          (error.message || "Verifique la consola para más detalles.")
      );
    }
  };

  return (
    <div className="depositar-garantia">
      <input
        type="text"
        value={monto}
        onChange={(e) => setMonto(e.target.value)}
        placeholder="Monto en ETH"
      />
      <button onClick={depositarGarantia}>Depositar Garantía</button>
    </div>
  );
};

export default DepositarGarantia;
