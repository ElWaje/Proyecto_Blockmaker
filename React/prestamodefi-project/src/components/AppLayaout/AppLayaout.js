import React from "react";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import "./AppLayout.css";

const AppLayout = ({ children }) => {
  return (
    <div className="app-layout">
      <Header />
      <main className="main-content">{children}</main>
      <Footer />
    </div>
  );
};

export default AppLayout;
