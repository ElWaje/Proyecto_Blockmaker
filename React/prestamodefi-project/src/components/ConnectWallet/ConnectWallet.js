import React, { useState } from "react";
import { ethers } from "ethers";
import toast from "react-hot-toast";
import "./ConnectWallet.css";

const ConnectWallet = ({ setSigner }) => {
  const [isWalletConnected, setIsWalletConnected] = useState(false);

  const connectWalletHandler = async () => {
    if (window.ethereum) {
      try {
        // Solicita acceso a la cuenta de usuario
        await window.ethereum.request({ method: "eth_requestAccounts" });
        // Crea un proveedor de ethers usando window.ethereum
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        // Establece el signer que se utilizará para las transacciones
        const signer = provider.getSigner();
        setSigner(signer);
        setIsWalletConnected(true); // Indica que la wallet está conectada
        toast.success("Wallet conectada exitosamente."); // Muestra un toast de éxito
      } catch (error) {
        console.error("Error al conectar la wallet:", error);
        toast.error(
          "Error al conectar la wallet. Por favor, inténtalo de nuevo."
        ); // Muestra un toast de error
      }
    } else {
      console.log("Por favor, instala MetaMask.");
      toast.error("Por favor, instala MetaMask."); // Muestra un toast para la instalación de MetaMask
    }
  };

  return (
    <div>
      <button
        className="connect-wallet-btn"
        onClick={connectWalletHandler}
        disabled={isWalletConnected}
      >
        {isWalletConnected ? "Wallet Conectada" : "Conectar Wallet"}
      </button>
    </div>
  );
};

export default ConnectWallet;
