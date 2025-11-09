import React, { useContext, useEffect } from "react";
import { PedidoContext } from "../context/PedidoContext";

function Alerta() {
  const { alerta, setAlerta } = useContext(PedidoContext);

  useEffect(() => {
    if (alerta) {
      const timer = setTimeout(() => setAlerta(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [alerta, setAlerta]);

  if (!alerta) return null;

  return (
    <div className={`alert alert-${alerta.tipo} text-center`} role="alert">
      {alerta.mensaje}
    </div>
  );
}

export default Alerta;
