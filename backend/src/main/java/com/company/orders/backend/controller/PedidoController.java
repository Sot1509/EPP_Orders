package com.company.orders.backend.controller;

import com.company.orders.backend.entity.Pedido;
import com.company.orders.backend.repository.PedidoRepository;
import com.company.orders.backend.repository.EppRepository;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@Slf4j
@RestController
@RequestMapping("/api/pedidos")
public class PedidoController {

    private final PedidoRepository pedidoRepository;
    private final EppRepository eppRepository;

    public PedidoController(PedidoRepository pedidoRepository, EppRepository eppRepository) {
        this.pedidoRepository = pedidoRepository;
        this.eppRepository = eppRepository;
    }

    // GET todos los pedidos
    @GetMapping
    public List<Pedido> getAllPedidos() {
        return pedidoRepository.findAll();
    }

    // GET un pedido por ID
    @GetMapping("/{id}")
    public ResponseEntity<Pedido> getPedidoById(@PathVariable Long id) {
        Optional<Pedido> pedido = pedidoRepository.findById(id);
        return pedido.map(ResponseEntity::ok)
                .orElseGet(() -> {
                    log.warn("⚠️ Pedido no encontrado: {}", id);
                    return ResponseEntity.notFound().build();
                });
    }

    // POST crear un pedido
    @PostMapping
    public ResponseEntity<Pedido> createPedido(@Valid @RequestBody Pedido pedido) {
        if (pedido.getEpp() != null && pedido.getEpp().getId() != null) {
            eppRepository.findById(pedido.getEpp().getId()).ifPresent(pedido::setEpp);
        }
        Pedido savedPedido = pedidoRepository.save(pedido);
        log.info("✅ Pedido creado: {}", savedPedido);
        return ResponseEntity.ok(savedPedido);
    }

    // PUT actualizar un pedido
    @PutMapping("/{id}")
    public ResponseEntity<Pedido> updatePedido(@PathVariable Long id, @Valid @RequestBody Pedido updatedPedido) {
        return pedidoRepository.findById(id)
                .map(pedido -> {
                    pedido.setCantidad(updatedPedido.getCantidad());
                    pedido.setEmpresa(updatedPedido.getEmpresa());
                    pedido.setFecha(updatedPedido.getFecha());
                    if (updatedPedido.getEpp() != null && updatedPedido.getEpp().getId() != null) {
                        eppRepository.findById(updatedPedido.getEpp().getId()).ifPresent(pedido::setEpp);
                    }
                    pedidoRepository.save(pedido);
                    log.info("✏️ Pedido actualizado: {}", pedido);
                    return ResponseEntity.ok(pedido);
                })
                .orElseGet(() -> {
                    log.warn("⚠️ Pedido no encontrado para actualizar: {}", id);
                    return ResponseEntity.notFound().build();
                });
    }

    // DELETE un pedido
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePedido(@PathVariable Long id) {
        if (pedidoRepository.existsById(id)) {
            pedidoRepository.deleteById(id);
            log.info("🗑️ Pedido eliminado: {}", id);
            return ResponseEntity.ok().build();
        } else {
            log.warn("⚠️ Pedido no encontrado para eliminar: {}", id);
            return ResponseEntity.notFound().build();
        }
    }
}
