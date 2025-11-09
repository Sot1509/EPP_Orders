import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const DetallePedido = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pedido, setPedido] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPedido = async () => {
      try {
        const res = await fetch(`http://localhost:8080/api/pedidos/${id}`);
        if (!res.ok) throw new Error("Pedido no encontrado");
        const data = await res.json();
        setPedido(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchPedido();
  }, [id]);

  if (loading) return <p>Cargando detalle...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div style={{ padding: "40px", textAlign: "center", backgroundColor: "#d0e7ff", minHeight: "100vh" }}>
      <h2>Detalle de Pedido</h2>
      <p><strong>EPP:</strong> {pedido.epp.nombre}</p>
      <p><strong>Tipo:</strong> {pedido.epp.tipo}</p>
      <p><strong>Cantidad:</strong> {pedido.cantidad}</p>
      <p><strong>Empresa:</strong> {pedido.empresa}</p>
      <p><strong>Fecha:</strong> {pedido.fecha}</p>
      <button
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          backgroundColor: "#0055a5",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
        onClick={() => navigate(-1)}
      >
        Volver
      </button>
    </div>
  );
};

export default DetallePedido;
