import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CrearPedido from "./pages/CrearPedido";
import DetallePedido from "./pages/DetallePedido";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/crear" element={<CrearPedido />} />
        <Route path="/detalle/:id" element={<DetallePedido />} />
      </Routes>
    </Router>
  );
}

export default App;
