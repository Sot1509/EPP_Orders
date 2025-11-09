import React, { createContext, useState, useEffect, useContext } from "react";

// Contexto
export const PedidoContext = createContext();

// Provider
export const PedidoProvider = ({ children }) => {
  const API_URL = "/api/pedidos";

  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Cargar pedidos desde el backend
  const cargarPedidos = async () => {
  try {
    setLoading(true);
    setError(null);

    const res = await fetch(API_URL);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

    const data = await res.json();
    setPedidos(data);
    setLoading(false);
  } catch (err) {
    setError(err.message);
    setPedidos([]);
    setLoading(false);
    console.error("Error al cargar pedidos:", err);
  }
};

  // Eliminar un pedido
  const eliminarPedido = async (id) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error(`No se pudo eliminar el pedido: ${res.status}`);
      setPedidos(pedidos.filter((p) => p.id !== id));
    } catch (err) {
      setError(err.message);
      console.error("Error al eliminar pedido:", err);
    }
  };

  useEffect(() => {
    cargarPedidos();
  }, []);

  return (
    <PedidoContext.Provider
      value={{ pedidos, loading, error, cargarPedidos, eliminarPedido }}
    >
      {children}
    </PedidoContext.Provider>
  );
};

// Hook personalizado para usar el contexto
export const usePedidos = () => {
  const context = useContext(PedidoContext);
  if (!context) {
    throw new Error("usePedidos debe usarse dentro de PedidoProvider");
  }
  return context;
};
