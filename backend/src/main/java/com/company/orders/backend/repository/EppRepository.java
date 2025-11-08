package com.company.orders.backend.repository;

import com.company.orders.backend.entity.Epp;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EppRepository extends JpaRepository<Epp, Long> {}