import React, { useState, useEffect } from "react";
import { usePedidos } from "../context/PedidoContext";

const FormularioPedido = ({ pedidoEditar = null, onVolver }) => {
  const { cargarPedidos } = usePedidos();

  const [empresa, setEmpresa] = useState(pedidoEditar?.empresa || "");
  const [cantidad, setCantidad] = useState(pedidoEditar?.cantidad || "");
  const [fecha, setFecha] = useState(pedidoEditar?.fecha || "");
  const [eppId, setEppId] = useState(pedidoEditar?.epp?.id || "");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const API_URL = "http://localhost:8080/api/pedidos";

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación básica
    if (!empresa || !cantidad || !fecha || !eppId) {
      setError("Todos los campos son obligatorios.");
      return;
    }

    const pedidoData = {
      empresa,
      cantidad: parseInt(cantidad),
      fecha,
      eppId: parseInt(eppId),
    };

    try {
      const method = pedidoEditar ? "PUT" : "POST";
      const url = pedidoEditar ? `${API_URL}/${pedidoEditar.id}` : API_URL;

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pedidoData),
      });

      if (!res.ok) throw new Error("Error al guardar el pedido");

      setSuccess("Pedido guardado correctamente!");
      setError("");
      cargarPedidos();
      onVolver();
    } catch (err) {
      setError(err.message);
      setSuccess("");
    }
  };

  return (
    <div className="min-h-screen bg-blue-100 flex justify-center items-center p-8">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-lg p-8 w-96 space-y-4"
      >
        <h2 className="text-2xl font-bold text-blue-800">
          {pedidoEditar ? "Editar Pedido" : "Nuevo Pedido"}
        </h2>

        {error && <p className="text-red-600">{error}</p>}
        {success && <p className="text-green-600">{success}</p>}

        <div>
          <label className="block mb-1 font-semibold">Empresa:</label>
          <input
            type="text"
            value={empresa}
            onChange={(e) => setEmpresa(e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Cantidad:</label>
          <input
            type="number"
            value={cantidad}
            onChange={(e) => setCantidad(e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Fecha:</label>
          <input
            type="date"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">EPP ID:</label>
          <input
            type="number"
            value={eppId}
            onChange={(e) => setEppId(e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div className="flex justify-between mt-4">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            {pedidoEditar ? "Actualizar" : "Crear"}
          </button>
          <button
            type="button"
            onClick={onVolver}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
          >
            Volver
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormularioPedido;