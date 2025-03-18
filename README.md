# Aplicacion FullStack Springboot & Angular

Proyecto creado con SpringBoot 3 y Java 21 + Angular 19

## Servidor de desarrollo con Docker Compose

Para correr el proyecto tener previamente instalado Docker + Docker compose


### Ejecucion

Clonar el repositorio y ubicarse en la raiz del proyecto.

Ejecutar el comando `docker compose --build` para construir las imagenes y levantar los contenedores. 

* Una vez esten completamente ejecutandose los tres contenedores (postgres-sql, springboot-app y puntored-web) navegar a la ruta `http://localhost:4200/auth/register` en tu navegador web 

* Registrate con una cuenta ingresando los campos requeridos

* Posteriormente seras redirijido al login donde iniciaras sesion con el correo y la contraseña recien registrados

* Al iniciar sesion seras redirijido a el listado de recargas, dirijete al menu lateral izquierdo y selecciona el menu > recargas > crear

* Diligencia los campos del formulario y compra tu primera recarga

* Consulta las recargas en el menu > recargas > historial

 ### Interconexion con el Backend

 Gracias a la red virtual de multiples contenedores se realiza la comunicacion entre el Frontend y el Backend.

 ## Tecnologias usadas

 ## Spring Boot App

 * SpringBoot 3
 * Base de datos Postgres sql 16
 * Spring Security
 * Autenticacion con JWT
 * Spring Web Flux
 * Lombok
 * Validators

## Angular App

* Angular CLI v19
* Node v20
* Ngx-translate, para manejar multilenguaje
* Angular material
* Metodologia Mobile First Design
* Estilos SCSS aplicando metodología BEM
* Formularios Reactivos
* RxJS
* Http Client
* Services
* Validators
* Guards
* Interceptors
* Interfaces
 

 
