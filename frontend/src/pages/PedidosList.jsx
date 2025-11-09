import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableHead, TableRow, Button, Container, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export default function PedidosList() {
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/pedidos')
      .then(res => setPedidos(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>Lista de Pedidos</Typography>
      <Button component={Link} to="/crear-pedido" variant="contained" color="primary" sx={{ mb: 2 }}>
        Crear Pedido
      </Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Empresa</TableCell>
            <TableCell>Cantidad</TableCell>
            <TableCell>Fecha</TableCell>
            <TableCell>EPP</TableCell>
            <TableCell>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {pedidos.map(p => (
            <TableRow key={p.id}>
              <TableCell>{p.id}</TableCell>
              <TableCell>{p.empresa}</TableCell>
              <TableCell>{p.cantidad}</TableCell>
              <TableCell>{p.fecha}</TableCell>
              <TableCell>{p.epp?.nombre}</TableCell>
              <TableCell>
                <Button component={Link} to={`/pedidos/${p.id}`} size="small">Ver</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
}
