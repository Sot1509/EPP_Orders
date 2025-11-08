package com.company.orders.backend.entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
public class Pedido {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String empresa;
    private LocalDate fecha;

    @ManyToOne
    @JoinColumn(name = "epp_id")
    private Epp epp;

    private int cantidad;

    public Pedido() {}
    public Pedido(Long id, String empresa, LocalDate fecha, Epp epp, int cantidad) {
        this.id = id;
        this.empresa = empresa;
        this.fecha = fecha;
        this.epp = epp;
        this.cantidad = cantidad;
    }

    // getters y setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getEmpresa() { return empresa; }
    public void setEmpresa(String empresa) { this.empresa = empresa; }
    public LocalDate getFecha() { return fecha; }
    public void setFecha(LocalDate fecha) { this.fecha = fecha; }
    public Epp getEpp() { return epp; }
    public void setEpp(Epp epp) { this.epp = epp; }
    public int getCantidad() { return cantidad; }
    public void setCantidad(int cantidad) { this.cantidad = cantidad; }
}
