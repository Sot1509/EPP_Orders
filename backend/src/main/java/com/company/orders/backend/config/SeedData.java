package com.company.orders.backend.config;

import com.company.orders.backend.entity.Epp;
import com.company.orders.backend.repository.EppRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Component;

@Component
public class SeedData {

    private final EppRepository eppRepository;

    public SeedData(EppRepository eppRepository) {
        this.eppRepository = eppRepository;
    }

    @PostConstruct
    public void init() {
        if (eppRepository.count() == 0) {
            eppRepository.save(new Epp("Guantes de nitrilo", "Manos"));
            eppRepository.save(new Epp("Gafas de seguridad", "Ojos"));
            eppRepository.save(new Epp("Respirador N95", "Respiración"));
            eppRepository.save(new Epp("Bata de laboratorio", "Cuerpo"));
            eppRepository.save(new Epp("Protector auditivo", "Oídos"));
        }
    }
}
