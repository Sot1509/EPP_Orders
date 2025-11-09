import React, { useState, useEffect } from "react";
import { usePedidos } from "../context/PedidoContext";

const FormularioPedido = ({ pedidoEditar, onVolver }) => {
  const { cargarPedidos } = usePedidos();
  const [empresa, setEmpresa] = useState(pedidoEditar?.empresa || "");
  const [cantidad, setCantidad] = useState(pedidoEditar?.cantidad || "");
  const [fecha, setFecha] = useState(pedidoEditar?.fecha || "");
  const [eppId, setEppId] = useState(pedidoEditar?.eppId || "");
  const [eppOptions, setEppOptions] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/epp")
      .then(res => res.json())
      .then(setEppOptions)
      .catch(err => console.error(err));
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();
    const metodo = pedidoEditar ? "PUT" : "POST";
    const url = pedidoEditar ? `/api/pedidos/${pedidoEditar.id}` : "/api/pedidos";

    try {
      const res = await fetch(url, {
        method: metodo,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ empresa, cantidad, fecha, eppId })
      });
      if (!res.ok) throw new Error("Error guardando pedido");
      cargarPedidos();
      onVolver();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <p>{error}</p>}
      <input value={empresa} onChange={e => setEmpresa(e.target.value)} placeholder="Empresa" />
      <input type="number" value={cantidad} onChange={e => setCantidad(e.target.value)} placeholder="Cantidad" />
      <input type="date" value={fecha} onChange={e => setFecha(e.target.value)} />
      <select value={eppId} onChange={e => setEppId(e.target.value)}>
        <option value="">Seleccione EPP</option>
        {eppOptions.map(e => <option key={e.id} value={e.id}>{e.nombre}</option>)}
      </select>
      <button type="submit">{pedidoEditar ? "Actualizar" : "Crear"}</button>
      <button type="button" onClick={onVolver}>Volver</button>
    </form>
  );
};

export default FormularioPedido;
