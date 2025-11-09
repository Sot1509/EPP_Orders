import React, { createContext, useState, useEffect, useContext } from "react";

export const PedidoContext = createContext();

export const PedidoProvider = ({ children }) => {
  const API_URL = "/api/pedidos";
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const cargarPedidos = async () => {
    try {
      setLoading(true);
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error("Error al cargar pedidos");
      const data = await res.json();
      setPedidos(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const eliminarPedido = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      setPedidos(pedidos.filter(p => p.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    cargarPedidos();
  }, []);

  return (
    <PedidoContext.Provider value={{ pedidos, loading, error, cargarPedidos, eliminarPedido }}>
      {children}
    </PedidoContext.Provider>
  );
};

export const usePedidos = () => useContext(PedidoContext);
