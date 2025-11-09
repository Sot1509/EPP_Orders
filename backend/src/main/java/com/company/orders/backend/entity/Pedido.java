package com.company.orders.backend.entity;

import jakarta.persistence.*;
import java.time.LocalDate;
import jakarta.validation.constraints.*;

@Entity
public class Pedido {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull(message = "La cantidad es obligatoria")
    @Min(value = 1, message = "La cantidad debe ser mayor a 0")
    private Integer cantidad;

    @NotBlank(message = "La empresa es obligatoria")
    private String empresa;

    @NotNull(message = "La fecha es obligatoria")
    private LocalDate fecha;

    @ManyToOne
    @NotNull(message = "El EPP es obligatorio")
    private Epp epp;

    public Pedido() {}

    public Pedido(Long id, Integer cantidad, String empresa, LocalDate fecha, Epp epp) {
        this.id = id;
        this.cantidad = cantidad;
        this.empresa = empresa;
        this.fecha = fecha;
        this.epp = epp;
    }

    // Getters y Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getCantidad() {
        return cantidad;
    }

    public void setCantidad(Integer cantidad) {
        this.cantidad = cantidad;
    }

    public String getEmpresa() {
        return empresa;
    }

    public void setEmpresa(String empresa) {
        this.empresa = empresa;
    }

    public LocalDate getFecha() {
        return fecha;
    }

    public void setFecha(LocalDate fecha) {
        this.fecha = fecha;
    }

    public Epp getEpp() {
        return epp;
    }

    public void setEpp(Epp epp) {
        this.epp = epp;
    }
}
