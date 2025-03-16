package com.puntored.apirest.config;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import io.swagger.v3.oas.models.servers.Server;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class OpenAPIConfig {

    @Value("${reservation.openapi.dev-url}")
    private String devUrl;


    @Value("${reservation.openapi.prod-url}")
    private String prodUrl;


    @Bean
    public OpenAPI myOpenAPI() {
        // Definir el servidor de desarrollo
        Server devServer = new Server();
        devServer.setUrl(devUrl);
        devServer.setDescription("Server URL in Development environment");


        Server prodServer = new Server();
        prodServer.setUrl(prodUrl);
        prodServer.setDescription("Server URL in Production environment");


        // Información de contacto
        Contact contact = new Contact();
        contact.setEmail("luisbel@mail.com");
        contact.setName("LAMB");
        contact.setUrl("https://lamb.com");


        // Licencia
        License mitLicense = new License().name("MIT License").url("https://choosealicense.com/licenses/mit/");


        // Información general de la API
        Info info = new Info()
                .title("API de Reservaciones de Restaurante")
                .version("1.0")
                .contact(contact)
                .description("Esta API expone endpoints para gestionar reservaciones de restaurante.")
                .termsOfService("https://www.lamb.com/terms")
                .license(mitLicense);


        // Configuración de seguridad JWT
        SecurityScheme securityScheme = new SecurityScheme()
                .type(SecurityScheme.Type.HTTP)
                .scheme("bearer")
                .bearerFormat("JWT")
                .name("JWT Authentication");


        Components components = new Components()
                .addSecuritySchemes("bearerAuth", securityScheme);


        // Requerimiento de seguridad para utilizar en las operaciones
        SecurityRequirement securityRequirement = new SecurityRequirement().addList("bearerAuth");


        return new OpenAPI()
                .info(info)
                .servers(List.of(devServer, prodServer))
                .addSecurityItem(securityRequirement)
                .components(components);
    }
}
