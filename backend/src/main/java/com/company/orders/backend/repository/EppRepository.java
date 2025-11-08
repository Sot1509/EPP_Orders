package com.company.orders.backend.repository;

import com.company.orders.backend.entity.Epp;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EppRepository extends JpaRepository<Epp, Long> {
}
