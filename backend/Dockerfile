# Usamos JDK 21
FROM eclipse-temurin:21-jdk-alpine

# Crear directorio de la app
WORKDIR /app

# Copiar el JAR generado
COPY target/backend-0.0.1-SNAPSHOT.jar app.jar

# Exponer el puerto 8080
EXPOSE 8080

# Comando para ejecutar la app
ENTRYPOINT ["java","-jar","app.jar"]
