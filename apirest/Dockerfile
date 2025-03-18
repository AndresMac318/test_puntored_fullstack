FROM eclipse-temurin:21-jdk-jammy as dependencies

WORKDIR /app
COPY pom.xml ./mvnw /app/
COPY ./.mvn /app/.mvn
RUN ./mvnw dependency:go-offline


FROM dependencies AS build

WORKDIR /app
COPY ./src /app/src
RUN ./mvnw clean install -DskipTests


FROM eclipse-temurin:21-jre-jammy AS production

WORKDIR /app
COPY --from=build /app/target/*.jar /app/target/apirest-puntored.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/app/target/apirest-puntored.jar"]