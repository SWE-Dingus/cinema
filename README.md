# cinema
## To run
Make sure you have [Docker](https://www.docker.com/) installed with [Docker Compose](https://docs.docker.com/compose/install/) support (bundled in Docker Desktop, available as a plugin on Linux). Then, just run
```sh
docker compose up --build
```
from the repository root. The site should then be accessible at http://localhost:8080. Requests to `/api/` will be reverse-proxied to the backend.
