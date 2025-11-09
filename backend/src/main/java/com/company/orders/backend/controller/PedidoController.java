package com.company.orders.backend.controller;

import com.company.orders.backend.dto.PedidoDTO;
import com.company.orders.backend.entity.Pedido;
import com.company.orders.backend.entity.Epp;
import com.company.orders.backend.repository.PedidoRepository;
import com.company.orders.backend.repository.EppRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.Optional;

@RestController
@RequestMapping("/api/pedidos")
@CrossOrigin(origins = "*")
public class PedidoController {

    private final PedidoRepository pedidoRepository;
    private final EppRepository eppRepository;

    public PedidoController(PedidoRepository pedidoRepository, EppRepository eppRepository) {
        this.pedidoRepository = pedidoRepository;
        this.eppRepository = eppRepository;
    }

    // GET pedidos con paginación
    @GetMapping
    public Page<Pedido> getAllPedidos(@RequestParam(defaultValue = "0") int page,
                                      @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return pedidoRepository.findAll(pageable);
    }

    // GET un pedido por ID
    @GetMapping("/{id}")
    public ResponseEntity<Pedido> getPedidoById(@PathVariable Long id) {
        Optional<Pedido> pedido = pedidoRepository.findById(id);
        return pedido.map(ResponseEntity::ok)
                     .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // POST crear un pedido
    @PostMapping
    public ResponseEntity<Pedido> createPedido(@Valid @RequestBody PedidoDTO pedidoDTO) {
        Optional<Epp> epp = eppRepository.findById(pedidoDTO.getEppId());
        if (epp.isEmpty()) return ResponseEntity.badRequest().build();

        Pedido pedido = new Pedido();
        pedido.setCantidad(pedidoDTO.getCantidad());
        pedido.setEmpresa(pedidoDTO.getEmpresa());
        pedido.setFecha(pedidoDTO.getFecha());
        pedido.setEpp(epp.get());

        Pedido savedPedido = pedidoRepository.save(pedido);
        return ResponseEntity.ok(savedPedido);
    }

    // PUT actualizar un pedido
    @PutMapping("/{id}")
    public ResponseEntity<Pedido> updatePedido(@PathVariable Long id, @Valid @RequestBody PedidoDTO pedidoDTO) {
        return pedidoRepository.findById(id)
                .map(pedido -> {
                    pedido.setCantidad(pedidoDTO.getCantidad());
                    pedido.setEmpresa(pedidoDTO.getEmpresa());
                    pedido.setFecha(pedidoDTO.getFecha());

                    Optional<Epp> epp = eppRepository.findById(pedidoDTO.getEppId());
                    epp.ifPresent(pedido::setEpp);

                    pedidoRepository.save(pedido);
                    return ResponseEntity.ok(pedido);
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // DELETE un pedido
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePedido(@PathVariable Long id) {
        if (pedidoRepository.existsById(id)) {
            pedidoRepository.deleteById(id);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
