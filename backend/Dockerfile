FROM maven:3.9.9-eclipse-temurin-22-alpine

WORKDIR /backend/

COPY src/ src/
COPY pom.xml .

RUN mvn -DskipFormatCode package

RUN mv target/backend*.jar backend.jar

CMD ["java", "-jar", "backend.jar"]
