# Módulo de Pedidos de EPP

Proyecto para la gestión de pedidos de Elementos de Protección Personal (EPP), desarrollado con **Spring Boot** en el backend y **React** en el frontend. Permite crear, listar, editar y eliminar pedidos, así como manejar distintos tipos de EPP.

---

## Autor
**Sebastian Sandoval**  
Correo: jsebastiansandovalsoto@gmail.com

---

## Tecnologías utilizadas

**Backend:**
- Java 17
- Spring Boot
- Spring Data JPA
- PostgreSQL
- Bean Validation

**Frontend:**
- React 18
- Context API
- React Router
- react-icons
- CSS personalizado con animaciones y gradientes

**DevOps:**
- Docker
- Docker Compose

---

## Instalación

1. Clonar el repositorio:
```
git clone <url-del-repositorio>
cd epp-orders
Levantar los contenedores con Docker:



docker-compose up --build
Esto iniciará el backend, frontend y la base de datos PostgreSQL.

Uso
Backend
Base URL: http://localhost:8080/api

Endpoints disponibles:

POST /pedidos - Crear un pedido

GET /pedidos - Listar pedidos con paginación

GET /pedidos/{id} - Obtener detalle de un pedido

GET /epp - Listar EPP disponibles

PUT /pedidos/{id} - Actualizar pedido

DELETE /pedidos/{id} - Eliminar pedido

Frontend
Base URL: http://localhost:3000

Pantallas:

Lista de pedidos con paginación

Crear pedido

Editar pedido

Detalle de pedido

Funcionalidades:

Validación de formularios

Feedback visual (errores y éxito)

Botón de crear pedido con ícono

Tarjetas con colores por tipo de EPP

Animaciones de aparición y hover

Base de datos
PostgreSQL

Datos de prueba incluidos en data.sql:

5 tipos de EPP

30 pedidos de ejemplo

Estructura del proyecto
css

epp-orders/
├─ backend/
│  ├─ src/main/java/com/company/orders/backend/
│  │  ├─ entity/
│  │  ├─ repository/
│  │  ├─ controller/
│  │  └─ dto/
│  └─ resources/
│     └─ data.sql
├─ frontend/
│  ├─ src/
│  │  ├─ pages/
│  │  ├─ components/
│  │  ├─ context/
│  │  └─ index.css
├─ docker-compose.yml
├─ Dockerfile
└─ README.md

Comandos útiles
Levantar aplicación con Docker:



docker-compose up --build
Ejecutar frontend en modo desarrollo:



cd frontend
npm install
npm start
Ejecutar backend en modo desarrollo:



cd backend
./mvnw spring-boot:run
Git:



git add .
git commit -m "📚 Actualización del proyecto"
git push origin main