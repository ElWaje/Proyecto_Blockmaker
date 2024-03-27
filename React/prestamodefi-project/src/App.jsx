import React from "react";
import {
  WagmiConfig,
  createClient,
  configureChains,
  defaultChains,
} from "wagmi";
import { ConnectKitProvider, getDefaultClient } from "@connectkit/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import { Toaster } from "react-hot-toast";

// Importando componentes de tu aplicación
import AppLayout from "./components/AppLayout/AppLayout";
import Home from "./components/Home/Home";
import AltaPrestamista from "./components/AltaPrestamista/AltaPrestamista";
import AltaCliente from "./components/AltaCliente/AltaCliente";
import DepositarGarantia from "./components/DepositarGarantia/DepositarGarantia";
import SolicitarPrestamo from "./components/SolicitarPrestamo/SolicitarPrestamo";
import AprobarPrestamo from "./components/AprobarPrestamo/AprobarPrestamo";
import ReembolsarPrestamo from "./components/ReembolsarPrestamo/ReembolsarPrestamo";
import LiquidarGarantia from "./components/LiquidarGarantia/LiquidarGarantia";
import PrestamosCliente from "./components/PrestamosCliente/PrestamosCliente";
import DetallesPrestamo from "./components/DetallesPrestamo/DetallesPrestamo";

// Configuración de Wagmi y ConnectKit
const { chains, provider } = configureChains(defaultChains, [
  jsonRpcProvider({ rpc: (chain) => ({ http: chain.rpcUrls.default }) }),
]);

const wagmiClient = createClient({
  autoConnect: true,
  provider,
});

function App() {
  return (
    <WagmiConfig client={wagmiClient}>
      <ConnectKitProvider
        client={getDefaultClient({ appName: "Mi Aplicación DeFi" })}
      >
        <Router>
          <Routes>
            <Route
              path="/"
              element={
                <AppLayout>
                  <Home />
                </AppLayout>
              }
            />
            <Route
              path="/gestion-usuarios"
              element={
                <AppLayout>
                  <AltaPrestamista />
                  <AltaCliente />
                </AppLayout>
              }
            />
            <Route
              path="/operaciones-prestamos"
              element={
                <AppLayout>
                  <DepositarGarantia />
                  <SolicitarPrestamo />
                  <AprobarPrestamo />
                  <ReembolsarPrestamo />
                  <LiquidarGarantia />
                  <PrestamosCliente />
                  <DetallesPrestamo />
                </AppLayout>
              }
            />
            {/* Puedes añadir más rutas según necesites */}
          </Routes>
          <Toaster />
        </Router>
      </ConnectKitProvider>
    </WagmiConfig>
  );
}

export default App;
