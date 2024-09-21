# backend

## Structure
| Package | Purpose |
| - | - |
| `com.cinema.backend.configs` | Configuration of Spring things. |
| `com.cinema.backend.controllers` | API endpoints. |
| `com.cinema.backend.entities` | Java classes that describe database entities. |
| `com.cinema.backend.repositories` | Spring Data JPA repository definitions. |
| `com.cinema.backend.services` | Services to be offered to Spring DI. |

## Run
```sh
./mvnw spring-boot:run
```

## Format
```sh
mvn git-code-format:format-code -Dgcf.globPattern='**/*'
```
