import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, TextField, Button, MenuItem, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

export default function PedidoForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [epps, setEpps] = useState([]);
  const [pedido, setPedido] = useState({ empresa: '', cantidad: '', fecha: '', epp: '' });

  useEffect(() => {
    axios.get('http://localhost:8080/api/epp')
      .then(res => setEpps(res.data))
      .catch(err => console.error(err));

    if (id) {
      axios.get(`http://localhost:8080/api/pedidos/${id}`)
        .then(res => setPedido({ ...res.data, epp: res.data.epp.id }))
        .catch(err => console.error(err));
    }
  }, [id]);

  const handleChange = e => setPedido({ ...pedido, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    const payload = { ...pedido, epp: { id: pedido.epp } };
    const request = id 
      ? axios.put(`http://localhost:8080/api/pedidos/${id}`, payload)
      : axios.post('http://localhost:8080/api/pedidos', payload);

    request.then(() => navigate('/'))
      .catch(err => console.error(err));
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>{id ? 'Editar Pedido' : 'Crear Pedido'}</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Empresa"
          name="empresa"
          value={pedido.empresa}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Cantidad"
          name="cantidad"
          type="number"
          value={pedido.cantidad}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Fecha"
          name="fecha"
          type="date"
          value={pedido.fecha}
          onChange={handleChange}
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
          required
        />
        <TextField
          select
          label="EPP"
          name="epp"
          value={pedido.epp}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        >
          {epps.map(e => (
            <MenuItem key={e.id} value={e.id}>{e.nombre}</MenuItem>
          ))}
        </TextField>
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
          {id ? 'Actualizar' : 'Crear'}
        </Button>
      </form>
    </Container>
  );
}
