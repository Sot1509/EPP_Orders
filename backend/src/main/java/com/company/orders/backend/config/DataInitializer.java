package com.company.orders.backend.config;

import com.company.orders.backend.entity.Epp;
import com.company.orders.backend.entity.Pedido;
import com.company.orders.backend.repository.EppRepository;
import com.company.orders.backend.repository.PedidoRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.List;

@Component
public class DataInitializer implements CommandLineRunner {

    private final EppRepository eppRepository;
    private final PedidoRepository pedidoRepository;

    public DataInitializer(EppRepository eppRepository, PedidoRepository pedidoRepository) {
        this.eppRepository = eppRepository;
        this.pedidoRepository = pedidoRepository;
    }

    @Override
    public void run(String... args) throws Exception {

        // Crear algunos EPPs de ejemplo
        Epp epp1 = new Epp(null, "EPP 1", "Casco");
        Epp epp2 = new Epp(null, "EPP 2", "Guantes");
        Epp epp3 = new Epp(null, "EPP 3", "Chaleco");

        eppRepository.saveAll(List.of(epp1, epp2, epp3));

        // Crear algunos Pedidos de ejemplo
        Pedido pedido1 = new Pedido(null, 10, "Empresa A", LocalDate.now(), epp1);
        Pedido pedido2 = new Pedido(null, 5, "Empresa B", LocalDate.now().minusDays(1), epp2);
        Pedido pedido3 = new Pedido(null, 20, "Empresa C", LocalDate.now().minusDays(2), epp3);

        pedidoRepository.saveAll(List.of(pedido1, pedido2, pedido3));

        System.out.println("Datos de prueba cargados correctamente!");
    }
}
