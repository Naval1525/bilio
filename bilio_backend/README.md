# Bilio Backend

A starter Go backend with Prisma ORM integration, organized for clean architecture and ready for containerization or deployment.

## Getting Started

1. **Install dependencies**
   ```bash
   go mod tidy
   ```

2. **Set up environment**
   ```bash
   cp .env.example .env
   ```

3. **Generate Prisma client**
   ```bash
   npx prisma generate
   ```

4. **Run database migrations**
   ```bash
   ./scripts/migrate.sh
   ```

5. **Start the development server**
   ```bash
   ./scripts/dev.sh
   ```

## Project Structure

- `cmd/server` — application entrypoint
- `internal/app` — domain-specific logic (handlers, services, repositories, models)
- `internal/config` — configuration loading
- `internal/database` — Prisma client bootstrap and migrations
- `internal/logger` — structured logging
- `internal/server` — HTTP server wiring
- `pkg/middleware` — reusable middleware
- `prisma` — Prisma schema and seeding logic
- `scripts` — helper scripts for development and migrations

## Prisma

This project expects Prisma CLI installed locally (via `npm install -g prisma` or `npx prisma`). Ensure your `DATABASE_URL` points to a supported database. For local development, you can use PostgreSQL, MySQL, or SQLite. Update `prisma/schema.prisma` accordingly.

## Next Steps

- Implement application-specific models and handlers.
- Add request validation, authentication, and testing.
- Containerize the service or integrate with CI/CD.


### Hot Reloading

This project ships with an `.air.toml` configuration for [Air](https://github.com/air-verse/air). Install Air (e.g. `go install github.com/air-verse/air@latest`) and run `./scripts/dev.sh` to start the server with automatic reloads.
