import React, { useState } from "react";
import { usePedidos } from "../context/PedidoContext";
import { useNavigate } from "react-router-dom";
import "../index.css";

const ListaPedidos = () => {
  const { pedidos, loading, error, eliminarPedido } = usePedidos();
  const navigate = useNavigate();

  // Paginación simple
  const [paginaActual, setPaginaActual] = useState(0);
  const pedidosPorPagina = 6; // 6 por fila para target layout
  const totalPaginas = Math.ceil(pedidos.length / pedidosPorPagina);

  const pedidosMostrados = pedidos.slice(
    paginaActual * pedidosPorPagina,
    (paginaActual + 1) * pedidosPorPagina
  );

  if (loading) return <p>Cargando pedidos...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!pedidos.length) return <p>No hay pedidos aún.</p>;

  return (
    <>
      <div className="lista-container">
        {pedidosMostrados.map((pedido) => (
          <div
            className={`pedido-card tipo-${pedido.epp.tipo.toLowerCase()}`}
            key={pedido.id}
          >
            <div className="pedido-content">
              <h3>{pedido.epp.nombre}</h3>
              <p>Cantidad: {pedido.cantidad}</p>
              <p>Empresa: {pedido.empresa}</p>
              <p>Fecha: {pedido.fecha}</p>
            </div>

            <div className="card-buttons">
              <button onClick={() => navigate(`/detalle/${pedido.id}`)}>
                Ver
              </button>
              <button onClick={() => navigate(`/editar/${pedido.id}`)}>
                Editar
              </button>
              <button onClick={() => eliminarPedido(pedido.id)}>
                Eliminar
              </button>
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
    </>
  );
};

export default ListaPedidos;
