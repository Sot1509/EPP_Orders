import React from "react";
import { Routes, Route } from "react-router-dom";
import ListaPedidos from "./pages/ListaPedidos";
import DetallePedido from "./pages/DetallePedido";
import FormularioPedido from "./pages/FormularioPedido";

function App() {
  return (
    <Routes>
      <Route path="/" element={<ListaPedidos />} />
      <Route path="/detalle/:id" element={<DetallePedido />} />
      <Route path="/editar/:id" element={<FormularioPedido />} />
      <Route path="/crear" element={<FormularioPedido />} />
    </Routes>
  );
}

export default App;
