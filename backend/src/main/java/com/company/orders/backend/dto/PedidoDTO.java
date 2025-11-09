package com.company.orders.backend.dto;

import jakarta.validation.constraints.*;
import java.time.LocalDate;

public class PedidoDTO {

    @NotNull(message = "Cantidad es requerida")
    @Min(value = 1, message = "Cantidad mínima es 1")
    private Integer cantidad;

    @NotBlank(message = "Empresa es requerida")
    private String empresa;

    @NotNull(message = "EPP es requerido")
    private Long eppId;

    @NotNull(message = "Fecha es requerida")
    private LocalDate fecha;

    // Getters y setters
    public Integer getCantidad() { return cantidad; }
    public void setCantidad(Integer cantidad) { this.cantidad = cantidad; }

    public String getEmpresa() { return empresa; }
    public void setEmpresa(String empresa) { this.empresa = empresa; }

    public Long getEppId() { return eppId; }
    public void setEppId(Long eppId) { this.eppId = eppId; }

    public LocalDate getFecha() { return fecha; }
    public void setFecha(LocalDate fecha) { this.fecha = fecha; }
}
