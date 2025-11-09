package com.company.orders.backend.controller;

import com.company.orders.backend.entity.Pedido;
import com.company.orders.backend.entity.Epp;
import com.company.orders.backend.dto.PedidoDTO;
import com.company.orders.backend.dto.EppDTO;
import com.company.orders.backend.repository.PedidoRepository;
import com.company.orders.backend.repository.EppRepository;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
public class PedidoController {

    private final PedidoRepository pedidoRepo;
    private final EppRepository eppRepo;

    public PedidoController(PedidoRepository pedidoRepo, EppRepository eppRepo) {
        this.pedidoRepo = pedidoRepo;
        this.eppRepo = eppRepo;
    }

    // Listar EPP
    @GetMapping("/epp")
    public List<EppDTO> listarEPP() {
        return eppRepo.findAll().stream()
                .map(e -> new EppDTO(e.getId(), e.getNombre(), e.getTipo()))
                .collect(Collectors.toList());
    }

    // Listar pedidos
    @GetMapping("/pedidos")
    public List<PedidoDTO> listarPedidos() {
        return pedidoRepo.findAll().stream()
                .map(p -> {
                    PedidoDTO dto = new PedidoDTO();
                    dto.setCantidad(p.getCantidad());
                    dto.setEmpresa(p.getEmpresa());
                    dto.setFecha(p.getFecha());
                    dto.setEppId(p.getEpp().getId());
                    return dto;
                }).collect(Collectors.toList());
    }

    // Crear pedido
    @PostMapping("/pedidos")
    public Pedido crearPedido(@RequestBody PedidoDTO dto) {
        Epp epp = eppRepo.findById(dto.getEppId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "EPP no existe"));

        Pedido p = new Pedido();
        p.setCantidad(dto.getCantidad());
        p.setEmpresa(dto.getEmpresa());
        p.setFecha(dto.getFecha());
        p.setEpp(epp);

        return pedidoRepo.save(p);
    }

    // Obtener detalle de pedido
    @GetMapping("/pedidos/{id}")
    public Pedido obtenerPedido(@PathVariable Long id) {
        return pedidoRepo.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Pedido no encontrado"));
    }

    // Actualizar pedido
    @PutMapping("/pedidos/{id}")
    public Pedido actualizarPedido(@PathVariable Long id, @RequestBody PedidoDTO dto) {
        Pedido p = pedidoRepo.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Pedido no encontrado"));

        Epp epp = eppRepo.findById(dto.getEppId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "EPP no existe"));

        p.setCantidad(dto.getCantidad());
        p.setEmpresa(dto.getEmpresa());
        p.setFecha(dto.getFecha());
        p.setEpp(epp);

        return pedidoRepo.save(p);
    }

    // Eliminar pedido
    @DeleteMapping("/pedidos/{id}")
    public void eliminarPedido(@PathVariable Long id) {
        pedidoRepo.deleteById(id);
    }
}
