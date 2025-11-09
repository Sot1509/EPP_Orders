import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const DetallePedido = () => {
  const { id } = useParams();
  const [pedido, setPedido] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`/api/pedidos/${id}`)
      .then(res => res.json())
      .then(setPedido)
      .catch(console.error);
  }, [id]);

  if (!pedido) return <p>Cargando...</p>;

  return (
    <div>
      <h2>Detalle Pedido</h2>
      <p>Empresa: {pedido.empresa}</p>
      <p>Cantidad: {pedido.cantidad}</p>
      <p>Fecha: {pedido.fecha}</p>
      <p>EPP: {pedido.epp?.nombre || pedido.eppId}</p>
      <button onClick={()=>navigate(-1)}>Volver</button>
    </div>
  );
};

export default DetallePedido;
