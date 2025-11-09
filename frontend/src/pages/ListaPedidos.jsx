import React, { useState } from "react";
import { usePedidos } from "../context/PedidoContext";
import FormularioPedido from "./FormularioPedido";
import "../index.css";

// Función para generar un color único a partir del ID del EPP
const generarColor = (id) => {
  const hue = (id * 137) % 360; // Distribuye colores uniformemente
  return `hsl(${hue}, 65%, 55%)`;
};

const ListaPedidos = () => {
  const { pedidos, loading, error, eliminarPedido } = usePedidos();

  const [pedidoEditar, setPedidoEditar] = useState(null);
  const [paginaActual, setPaginaActual] = useState(0);
  const pedidosPorPagina = 6;
  const totalPaginas = Math.ceil(pedidos.length / pedidosPorPagina);

  const pedidosMostrados = pedidos.slice(
    paginaActual * pedidosPorPagina,
    (paginaActual + 1) * pedidosPorPagina
  );

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
    <>
      <div className="lista-container">
        {pedidosMostrados.map((pedido) => (
          <div
            className="pedido-card"
            key={pedido.id}
            style={{ backgroundColor: generarColor(pedido.epp.id) }}
          >
            <div className="pedido-content">
              <h3>{pedido.epp.nombre}</h3>
              <p>Cantidad: {pedido.cantidad}</p>
              <p>Empresa: {pedido.empresa}</p>
              <p>Fecha: {pedido.fecha}</p>
            </div>

            <div className="card-buttons">
              <button onClick={() => setPedidoEditar(pedido)}>Ver / Editar</button>
              <button onClick={() => eliminarPedido(pedido.id)}>Eliminar</button>
            </div>
          </div>
        ))}
      </div>

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
