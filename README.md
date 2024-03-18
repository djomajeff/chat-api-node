# Chat API

## Description

This project is a Dockerized application that includes Directus, PostgreSQL, and Node.js.

## Prerequisites

Before running the application, make sure you have the following installed on your machine:

- Docker
- Docker Compose

## Installation

1. Clone the repository:

```bash
git clone https://github.com/your/repository.git
```

2. Navigate to the project directory:

```bash
cd project-directory
```

3. Build and start the Docker containers:

```bash
docker-compose up -d
```

4. Wait for the containers to start up. You can check the logs to monitor the progress:

```bash
docker-compose logs -f
```

5. Once the containers are up and running, you can access the application at:

- Directus: http://localhost:8055
- PostgreSQL: localhost:5432
- Node.js: http://localhost:3000

## Usage

- Use Directus to manage your database and API.
- Use Node.js to develop your application.

## Configuration

- Directus configuration: [directus/config](directus/config)
- PostgreSQL configuration: [docker-compose.yml](docker-compose.yml)
- Node.js configuration: [node-app](node-app)

## Contributing

Contributions are welcome! Please follow the [contribution guidelines](CONTRIBUTING.md).

## License

This project is licensed under the [MIT License](LICENSE).
