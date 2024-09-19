FROM maven:3.9.9-eclipse-temurin-22-alpine

WORKDIR /backend/

COPY pom.xml .
RUN mvn dependency:go-offline

COPY src/ src/
RUN mvn package -DskipFormatCode -Dmaven.test.skip

RUN mv target/backend*.jar backend.jar

CMD ["java", "-jar", "backend.jar"]
