# Gestor de contactos

Prueba técnica para Electronic ID

La aplicación se compone de dos partes, una API (Spring Boot) y un Cliente (Angular). 

Hace falta tener instalado:
- Java JDK `11`
- MongoDB `5.0.x`
- NodeJS `v14.17.x`
- NPM `6.14.x`

En mongo hace falta tener creada la colección `contacts-demo`.

### Arranque

Es necesario tener arrancado el servicio de Mongo antes del arranque de las aplicaciones.

En dos terminales separadas ejecutar los siguientes comandos desde la carpeta raíz:

API
```
cd contacts-demo-api
mvnw spring-boot:run
```

CLIENTE
```
cd contacts-demo-client
npm run serve
```

### Acceso

La URL para el cliente es: `http://localhost:4200/`. 

Credenciales de acceso: 
- u: `userone@nomail.com` p: `prueba123`
- u: `usertwo@nomail.com` p: `prueba123`

Puede verificar si la API está funcionando en: `http://localhost:8080/manage/conn`

### Info adicional

La API dispone de unas rutas públicas adicionales para permitir la gestión de los datos:
- Swagger: `http://localhost:8080/manage/swagger-ui`
- Consola H2: `http://localhost:8080/manage/h2-console`
- Docs API: `http://localhost:8080/manage/api-docs`

Las credenciales para el acceso a H2 son:
    - username: `sa`
    - password: `password`

### Datos para la aplicación

#### H2

H2 utiliza la BBDD preconfigurada en el fichero `contacts-demo-api\data\demo.mv.db`

En caso de no utilizar este fichero, hace falta ejecutar la siguiente query para poder realizar login.

```SQL
INSERT INTO USER VALUES
(1,	'User', 'One', '$2a$10$6l.Rit1Y55mloy9KHVcBJuLPjpyMGKNCbbDto1Alh9L.a39rYv0n.', 'userone@nomail.com'),
(2, 'User', 'Two', '$2a$10$6l.Rit1Y55mloy9KHVcBJuLPjpyMGKNCbbDto1Alh9L.a39rYv0n.', 'usertwo@nomail.com')
;
```

#### MongoDB

Por defecto, no debería tener datos registrados.
Puede realizar una carga manual de los datos utilizando el fichero `contacts-demo-api\data\mongo-contacts.json`

