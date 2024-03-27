import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { useToasts } from "react-hot-toast";
import "./PrestamosCliente.css";
import {
  contratoPrestamoDeFiAddress,
  contratoPrestamoDeFiABI,
} from "../../ContratoConfig";

const PrestamosCliente = ({ signer }) => {
  const [prestamos, setPrestamos] = useState([]);
  const [estado, setEstado] = useState("");
  const { error } = useToasts();

  useEffect(() => {
    const obtenerPrestamos = async () => {
      if (!signer) {
        error("Conecta tu wallet.");
        return;
      }

      try {
        const address = await signer.getAddress();
        const contrato = new ethers.Contract(
          contratoPrestamoDeFiAddress,
          contratoPrestamoDeFiABI,
          signer
        );
        const prestamosIds = await contrato.obtenerPrestamosPorPrestatario(
          address
        );

        const prestamosDetalle = await Promise.all(
          prestamosIds.map(async (id) => {
            return await contrato.obtenerDetalleDePrestamo(address, id);
          })
        );

        setPrestamos(prestamosDetalle);
      } catch (error) {
        error("Error al cargar los préstamos.");
      }
    };

    obtenerPrestamos();
  }, [signer]);

  return (
    <div className="prestamos-cliente">
      <h2>Mis Préstamos</h2>
      {estado && <p>{estado}</p>}
      <ul>
        {prestamos.map((prestamo, index) => (
          <li key={index}>
            ID: {prestamo.id.toString()}, Monto:{" "}
            {ethers.utils.formatEther(prestamo.monto)} ETH, Estado:{" "}
            {prestamo.estado}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PrestamosCliente;
