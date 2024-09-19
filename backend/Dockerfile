FROM maven:3.9.9-eclipse-temurin-22-alpine

WORKDIR /backend/

COPY pom.xml .
RUN mvn dependency:go-offline
# work-around for go-offline not downloading all deps (MDEP-82)
RUN mvn verify --fail-never -Dmaven.test.skip

COPY src/ src/
RUN mvn package -DskipFormatCode -Dmaven.test.skip

RUN mv target/backend*.jar backend.jar

CMD ["java", "-jar", "backend.jar"]
