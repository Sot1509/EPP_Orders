INSERT INTO epp(nombre, tipo) VALUES
('Guantes de nitrilo', 'Manos'),
('Gafas de seguridad', 'Ojos'),
('Respirador N95', 'Respiración'),
('Bata de laboratorio', 'Cuerpo'),
('Protector auditivo', 'Oídos');

INSERT INTO pedido(cantidad, empresa, epp_id, fecha) VALUES
(10, 'Empresa1', 1, '2025-11-08'),
(5, 'Empresa2', 2, '2025-11-07'),
(7, 'Empresa3', 3, '2025-11-06'),
(3, 'Empresa4', 4, '2025-11-05'),
(8, 'Empresa5', 5, '2025-11-04'),
(6, 'Empresa1', 1, '2025-11-03'),
(9, 'Empresa2', 2, '2025-11-02'),
(4, 'Empresa3', 3, '2025-11-01'),
(2, 'Empresa4', 4, '2025-10-31'),
(1, 'Empresa5', 5, '2025-10-30');
