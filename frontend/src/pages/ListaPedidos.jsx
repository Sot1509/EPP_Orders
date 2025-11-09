import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { usePedidos } from "../context/PedidoContext";
import { FaPlus } from "react-icons/fa";
import "../index.css";

const ListaPedidos = () => {
  const { pedidos, loading, error, eliminarPedido } = usePedidos();
  const [paginaActual, setPaginaActual] = useState(0);
  const pedidosPorPagina = 6;
  const totalPaginas = Math.ceil(pedidos.length / pedidosPorPagina);
  const navigate = useNavigate();

  const pedidosMostrados = pedidos.slice(
    paginaActual * pedidosPorPagina,
    (paginaActual + 1) * pedidosPorPagina
  );

  if (loading) return <p>Cargando pedidos...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!pedidos.length) return <p>No hay pedidos aún.</p>;

  return (
    <div style={{ width: "100%" }}>
      {/* Botón Crear Pedido */}
      <div style={{ display: "flex", justifyContent: "center", margin: "20px 0" }}>
        <button
          className="btn-crear"
          onClick={() => navigate("/crear")}
          style={{ display: "flex", alignItems: "center", gap: "8px" }}
        >
          <FaPlus /> Crear Pedido
        </button>
      </div>

      {/* Lista de pedidos */}
      <div className="lista-container">
        {pedidosMostrados.map((pedido) => (
          <div
            key={pedido.id}
            className={`pedido-card tipo-${pedido.epp.tipo.replace(/\s/g, "")}`}
          >
            <div className="pedido-content">
              <h3>{pedido.epp.nombre}</h3>
              <p>Cantidad: {pedido.cantidad}</p>
              <p>Empresa: {pedido.empresa}</p>
              <p>Fecha: {pedido.fecha}</p>
            </div>

            <div className="card-buttons">
              <button onClick={() => navigate(`/detalle/${pedido.id}`)}>Ver</button>
              <button onClick={() => navigate(`/editar/${pedido.id}`)}>Editar</button>
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
