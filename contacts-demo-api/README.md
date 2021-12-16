# ContactsDemoAPI

This project was generated using Spring Boot Starter.

Dependencies:
- Java `11`
- Maven `3.6.x`
- MongoDB `5.0.5`

## Development

Run `mvnw clean install` before the first run.

Use `mvnw spring-boot:run` to start the development server.

Useful URL:

- Check if the api is running @ `http://localhost:8080/manage/conn`.
- Access the embedded database @ `http://localhost:8080/manage/h2-console`
    - username `sa`
    - password `password`
- View Swagger @ `http://localhost:8080/manage/swagger-ui`

## Dockerized version

Create an image: `docker-compose config`
Run the container: `docker-compose up --build`
Stop the container: `docker-compose down`
