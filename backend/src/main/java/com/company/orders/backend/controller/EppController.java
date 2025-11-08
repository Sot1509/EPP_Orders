package com.company.orders.backend.controller;

import com.company.orders.backend.entity.Epp;
import com.company.orders.backend.repository.EppRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/epp")
public class EppController {

    @Autowired
    private EppRepository eppRepository;

    @GetMapping
    public List<Epp> listarEpp() {
        return eppRepository.findAll();
    }
}
