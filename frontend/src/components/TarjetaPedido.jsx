import React, { useState } from "react";

export default function TarjetaPedido({ pedido, alVer, alEliminar }) {
  const [hover, setHover] = useState(false);

  return (
    <div
      className="tarjeta-pedido"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <h3>{pedido.nombreCliente}</h3>
      <p>{pedido.descripcion}</p>
      <p className="estado">Estado: {pedido.estado}</p>

      {hover && (
        <div className="acciones">
          <button onClick={() => alVer(pedido)}>👁 Ver</button>
          <button onClick={() => alEliminar(pedido.id)}>🗑 Eliminar</button>
        </div>
      )}
    </div>
  );
}
