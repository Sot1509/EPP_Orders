import React, { useState, useEffect } from "react";
import { usePedidos } from "../context/PedidoContext";
import { useNavigate } from "react-router-dom";

const FormularioPedido = ({ pedidoEditar = null, onVolver }) => {
  const { cargarPedidos } = usePedidos();
  const navigate = useNavigate();

  const [empresa, setEmpresa] = useState(pedidoEditar?.empresa || "");
  const [cantidad, setCantidad] = useState(pedidoEditar?.cantidad || "");
  const [fecha, setFecha] = useState(pedidoEditar?.fecha || "");
  const [eppId, setEppId] = useState(pedidoEditar?.epp?.id || "");
  const [eppOptions, setEppOptions] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetch("/api/epp")
      .then(res => res.json())
      .then(setEppOptions)
      .catch(err => console.error(err));
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();
    if (!empresa || !cantidad || !fecha || !eppId) {
      setError("Todos los campos son obligatorios");
      return;
    }

    const pedidoData = {
      empresa,
      cantidad: Number(cantidad),
      fecha,
      epp: { id: Number(eppId) } // clave: enviar el objeto con id
    };

    try {
      const method = pedidoEditar ? "PUT" : "POST";
      const url = pedidoEditar
        ? `/api/pedidos/${pedidoEditar.id}`
        : "/api/pedidos";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pedidoData)
      });

      if (!res.ok) throw new Error("Error guardando pedido");

      setSuccess("Pedido guardado correctamente!");
      setError("");
      cargarPedidos();
      if (onVolver) onVolver();
      else navigate("/");
    } catch (err) {
      setError(err.message);
      setSuccess("");
    }
  };

  return (
    <div className="form-container">
      <h2>{pedidoEditar ? "Editar Pedido" : "Crear Pedido"}</h2>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
      <form onSubmit={handleSubmit}>
        <input
          value={empresa}
          onChange={e => setEmpresa(e.target.value)}
          placeholder="Empresa"
        />
        <input
          type="number"
          value={cantidad}
          onChange={e => setCantidad(e.target.value)}
          placeholder="Cantidad"
        />
        <input
          type="date"
          value={fecha}
          onChange={e => setFecha(e.target.value)}
        />
        <select value={eppId} onChange={e => setEppId(e.target.value)}>
          <option value="">Seleccione EPP</option>
          {eppOptions.map(e => (
            <option key={e.id} value={e.id}>
              {e.nombre}
            </option>
          ))}
        </select>
        <div className="form-buttons">
          <button type="submit">{pedidoEditar ? "Actualizar" : "Crear"}</button>
          <button type="button" onClick={() => (onVolver ? onVolver() : navigate("/"))}>
            Volver
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormularioPedido;
  