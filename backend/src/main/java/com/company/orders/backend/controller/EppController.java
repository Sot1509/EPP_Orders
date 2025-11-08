package com.company.orders.backend.controller;

import com.company.orders.backend.entity.Epp;
import com.company.orders.backend.repository.EppRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/epp")
public class EppController {

    private final EppRepository eppRepository;

    public EppController(EppRepository eppRepository) {
        this.eppRepository = eppRepository;
    }

    @GetMapping
    public List<String> getAllEpp() {
        return eppRepository.findAll().stream()
                .map(Epp::getNombre)
                .toList();
    }

    @PostMapping
    public Epp createEpp(@RequestBody Epp epp) {
        return eppRepository.save(epp);
    }

    @GetMapping("/{id}")
    public Epp getEppById(@PathVariable Long id) {
        return eppRepository.findById(id).orElseThrow(() -> new RuntimeException("EPP no encontrado"));
    }

    @PutMapping("/{id}")
    public Epp updateEpp(@PathVariable Long id, @RequestBody Epp updatedEpp) {
        Epp epp = eppRepository.findById(id).orElseThrow(() -> new RuntimeException("EPP no encontrado"));
        epp.setNombre(updatedEpp.getNombre());
        epp.setTipo(updatedEpp.getTipo());
        return eppRepository.save(epp);
    }

    @DeleteMapping("/{id}")
    public void deleteEpp(@PathVariable Long id) {
        eppRepository.deleteById(id);
    }
}
