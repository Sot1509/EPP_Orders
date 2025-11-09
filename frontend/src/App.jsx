import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PedidosList from './pages/PedidosList';
import PedidoDetail from './pages/PedidoDetail';
import PedidoForm from './pages/PedidoForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PedidosList />} />
        <Route path="/pedidos/:id" element={<PedidoDetail />} />
        <Route path="/crear-pedido" element={<PedidoForm />} />
      </Routes>
    </Router>
  );
}

export default App;
