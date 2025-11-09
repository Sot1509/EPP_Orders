import React, { useState } from "react";
import { usePedidos } from "../context/PedidoContext";
import { useNavigate } from "react-router-dom";
import "../index.css";
import { FaPlus } from "react-icons/fa"; 
import FormularioPedido from "./FormularioPedido";


const ListaPedidos = () => {
  const { pedidos, loading, error, eliminarPedido } = usePedidos();
  const navigate = useNavigate();

  const [pedidoEditar, setPedidoEditar] = useState(null);
  const [paginaActual, setPaginaActual] = useState(0);
  const pedidosPorPagina = 6;
  const totalPaginas = Math.ceil(pedidos.length / pedidosPorPagina);

  const pedidosMostrados = pedidos.slice(
    paginaActual * pedidosPorPagina,
    (paginaActual + 1) * pedidosPorPagina
  );

  // Colores aleatorios para cada tarjeta
  const colores = [
    "#4caf50", "#2196f3", "#ff9800", "#9c27b0",
    "#f44336", "#00bcd4", "#ffd166", "#06d6a0", "#ef476f"
  ];

  if (loading) return <p>Cargando pedidos...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!pedidos.length) return <p>No hay pedidos aún.</p>;

  if (pedidoEditar)
    return (
      <FormularioPedido
        pedidoEditar={pedidoEditar}
        onVolver={() => setPedidoEditar(null)}
      />
    );

  return (
    <div className="container">
      {/* Botón Crear Pedido */}
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "1rem" }}>
        <button
          onClick={() => navigate("/crear")}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            padding: "8px 12px",
            borderRadius: "6px",
            backgroundColor: "#ffd166",
            color: "#0b1b33",
            border: "none",
            cursor: "pointer",
          }}
        >
          <FaPlus /> Crear Pedido
        </button>
      </div>

      <div className="lista-container">
        {pedidosMostrados.map((pedido, index) => (
          <div
            className="pedido-card"
            key={pedido.id}
            style={{ backgroundColor: colores[index % colores.length] }}
          >
            <div className="pedido-content">
              <h3>{pedido.epp?.nombre}</h3>
              <p>Cantidad: {pedido.cantidad}</p>
              <p>Empresa: {pedido.empresa}</p>
              <p>Fecha: {pedido.fecha}</p>
            </div>

            <div className="card-buttons">
              <button onClick={() => navigate(`/detalle/${pedido.id}`)}>Ver</button>
              <button onClick={() => setPedidoEditar(pedido)}>Editar</button>
              <button onClick={() => eliminarPedido(pedido.id)}>Eliminar</button>
            </div>
          </div>
        ))}
      </div>

      {/* Paginación */}
      {totalPaginas > 1 && (
        <div className="pagination">
          <button
            disabled={paginaActual === 0}
            onClick={() => setPaginaActual(paginaActual - 1)}
          >
            ← Anterior
          </button>
          {[...Array(totalPaginas)].map((_, i) => (
            <button
              key={i}
              className={i === paginaActual ? "active" : ""}
              onClick={() => setPaginaActual(i)}
            >
              {i + 1}
            </button>
          ))}
          <button
            disabled={paginaActual === totalPaginas - 1}
            onClick={() => setPaginaActual(paginaActual + 1)}
          >
            Siguiente →
          </button>
        </div>
      )}
    </div>
  );
};

export default ListaPedidos;
