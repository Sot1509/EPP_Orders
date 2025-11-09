import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';

export default function PedidoDetail() {
  const { id } = useParams();
  const [pedido, setPedido] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8080/api/pedidos/${id}`)
      .then(res => setPedido(res.data))
      .catch(err => console.error(err));
  }, [id]);

  if (!pedido) return <Container sx={{ mt: 4 }}>Cargando...</Container>;

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>Detalle del Pedido #{pedido.id}</Typography>
      <Typography>Empresa: {pedido.empresa}</Typography>
      <Typography>Cantidad: {pedido.cantidad}</Typography>
      <Typography>Fecha: {pedido.fecha}</Typography>
      <Typography>EPP: {pedido.epp?.nombre}</Typography>
    </Container>
  );
}
