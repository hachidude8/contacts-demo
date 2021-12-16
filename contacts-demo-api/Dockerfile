# contacts-api

# 1. Setting up MAVEN
FROM maven:3.6.3 AS maven

WORKDIR /usr/src/contacts-api
COPY . /usr/src/contacts-api

# 2. Compile and package the application to an executable JAR
RUN mvn clean package 

# 3. Setting deployment environment
FROM openjdk:11

ARG JAR_FILE=contacts-api.jar
ARG DEMO_DB=demo.mv.db
WORKDIR /opt/contacts-api

COPY --from=maven /usr/src/contacts-api/target/${JAR_FILE} /opt/contacts-api/
COPY --from=maven /usr/src/contacts-api/data/${DEMO_DB} /opt/contacts-api/data/

# 4. Run API and expose port
EXPOSE 8080
ENTRYPOINT ["java","-jar","contacts-api.jar"]
