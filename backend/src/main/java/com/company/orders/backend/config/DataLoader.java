package com.company.orders.backend.config;

import com.company.orders.backend.entity.Epp;
import com.company.orders.backend.entity.Pedido;
import com.company.orders.backend.repository.EppRepository;
import com.company.orders.backend.repository.PedidoRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import java.time.LocalDate;

@Component
public class DataLoader implements CommandLineRunner {

    private final EppRepository eppRepository;
    private final PedidoRepository pedidoRepository;

    public DataLoader(EppRepository eppRepository, PedidoRepository pedidoRepository) {
        this.eppRepository = eppRepository;
        this.pedidoRepository = pedidoRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        Epp guantes = eppRepository.save(new Epp(null, "Guantes", null));
        Epp gafas = eppRepository.save(new Epp(null, "Gafas", null));
        Epp mascarilla = eppRepository.save(new Epp(null, "Mascarilla", null));
        Epp casco = eppRepository.save(new Epp(null, "Casco", null));
        Epp bata = eppRepository.save(new Epp(null, "Bata", null));

        pedidoRepository.save(new Pedido(null, "Empresa A", LocalDate.now(), guantes, 10));
        pedidoRepository.save(new Pedido(null, "Empresa B", LocalDate.now(), gafas, 5));
        pedidoRepository.save(new Pedido(null, "Empresa C", LocalDate.now(), mascarilla, 20));
        pedidoRepository.save(new Pedido(null, "Empresa D", LocalDate.now(), casco, 7));
        pedidoRepository.save(new Pedido(null, "Empresa E", LocalDate.now(), bata, 15));
        pedidoRepository.save(new Pedido(null, "Empresa A", LocalDate.now(), guantes, 12));
        pedidoRepository.save(new Pedido(null, "Empresa B", LocalDate.now(), gafas, 8));
        pedidoRepository.save(new Pedido(null, "Empresa C", LocalDate.now(), mascarilla, 11));
        pedidoRepository.save(new Pedido(null, "Empresa D", LocalDate.now(), casco, 6));
        pedidoRepository.save(new Pedido(null, "Empresa E", LocalDate.now(), bata, 9));
    }
}