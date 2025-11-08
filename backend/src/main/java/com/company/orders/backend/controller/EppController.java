package com.company.orders.backend.controller;

import com.company.orders.backend.entity.Epp;
import com.company.orders.backend.repository.EppRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/epp")
public class EppController {

    private final EppRepository eppRepository;

    public EppController(EppRepository eppRepository) {
        this.eppRepository = eppRepository;
    }

    // GET todos los EPPs
    @GetMapping
    public List<Epp> getAllEpps() {
        return eppRepository.findAll();
    }

    // GET un EPP por ID
    @GetMapping("/{id}")
    public ResponseEntity<Epp> getEppById(@PathVariable Long id) {
        Optional<Epp> epp = eppRepository.findById(id);
        return epp.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // POST crear un EPP
    @PostMapping
    public Epp createEpp(@RequestBody Epp epp) {
        return eppRepository.save(epp);
    }

    // PUT actualizar un EPP
    @PutMapping("/{id}")
    public ResponseEntity<Epp> updateEpp(@PathVariable Long id, @RequestBody Epp updatedEpp) {
        return eppRepository.findById(id)
                .map(epp -> {
                    epp.setNombre(updatedEpp.getNombre());
                    epp.setTipo(updatedEpp.getTipo());
                    eppRepository.save(epp);
                    return ResponseEntity.ok(epp);
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // DELETE un EPP
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEpp(@PathVariable Long id) {
        if(eppRepository.existsById(id)) {
            eppRepository.deleteById(id);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
