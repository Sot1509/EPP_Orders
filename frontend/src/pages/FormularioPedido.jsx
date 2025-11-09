import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { usePedidos } from "../context/PedidoContext";

const FormularioPedido = ({ pedidoEditar }) => {
  const { cargarPedidos } = usePedidos();
  const navigate = useNavigate();

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
      navigate("/"); // Volver a la lista después de guardar
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="form-wrapper">
      <form className="form-card" onSubmit={handleSubmit}>
        <h2>{pedidoEditar ? "Editar Pedido" : "Nuevo Pedido"}</h2>

        {error && <p className="form-error">{error}</p>}

        <label>Empresa:</label>
        <input value={empresa} onChange={e => setEmpresa(e.target.value)} placeholder="Empresa" />

        <label>Cantidad:</label>
        <input type="number" value={cantidad} onChange={e => setCantidad(e.target.value)} placeholder="Cantidad" />

        <label>Fecha:</label>
        <input type="date" value={fecha} onChange={e => setFecha(e.target.value)} />

        <label>EPP:</label>
        <select value={eppId} onChange={e => setEppId(e.target.value)}>
          <option value="">Seleccione EPP</option>
          {eppOptions.map(e => <option key={e.id} value={e.id}>{e.nombre}</option>)}
        </select>

        <div className="form-buttons">
          <button type="submit">{pedidoEditar ? "Actualizar" : "Crear"}</button>
          <button type="button" onClick={() => navigate("/")}>Volver</button>
        </div>
      </form>
    </div>
  );
};

export default FormularioPedido;
