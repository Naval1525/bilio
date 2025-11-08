# Bilio

> Simplify billing, track expenses, and understand profitability—without drowning in spreadsheets.

Bilio is a modern billing workspace for agencies and independent professionals. Create branded invoices, automate payment reminders, reconcile expenses, and surface actionable financial insights from a single dashboard.

## Table of Contents
- [Why Bilio](#why-bilio)
- [Product Highlights](#product-highlights)
- [Architecture](#architecture)
- [Getting Started](#getting-started)
- [Configuration](#configuration)
- [API Overview](#api-overview)
- [Development Workflow](#development-workflow)
- [Roadmap](#roadmap)
- [Community](#community)

## Why Bilio
Professionals currently juggle multiple tools to manage billing and expenses. They need:
- A unified view of invoices, payments, and expenses
- Automated follow-ups that actually get invoices paid
- Accurate profitability per client or project
- Tax-ready reports without the end-of-quarter scramble

Bilio brings these essentials into one cohesive workspace so teams spend less time on admin and more time delivering client value.

## Product Highlights

**Invoicing**
- Branded invoices and PDF exports with your logo and business info
- One-click payment links (Stripe, Razorpay) supporting cards, UPI, and wallets
- Automatic, escalating reminders for overdue invoices
- Recurring invoices for retainers or subscription work
- Multi-currency support covering INR, USD, and international clients

**Expense Tracking**
- Upload receipts and attach them to transactions
- Attribute expenses to clients or projects for profit tracking
- Categorize spending for tax summaries and bookkeeping handoff

**Financial Intelligence**
- Client-level profitability and P&L snapshots
- Revenue, outstanding invoices, and cash-flow trends
- Tax-ready exports for accountants (CSV/PDF)
- Dashboard analytics for at-a-glance insights

## Architecture
- **Frontend:** Next.js, React, Tailwind CSS, shadcn/ui
- **Backend:** Go REST API (`/api/v1`), PostgreSQL, Redis, AWS S3
- **Integrations:** Stripe, Razorpay, SendGrid/SES, Puppeteer for PDF generation

```
Frontend (Next.js)  →  Backend (Go)  →  PostgreSQL
         ↓                     ↓
        S3                 Redis jobs
         ↓                     ↓
Payment providers (Stripe, Razorpay)
```

## Getting Started

### Prerequisites
- Node.js 18+
- Go 1.22+
- PostgreSQL 15+
- Redis 7+
- Docker (optional) for local orchestration

### Installation
```bash
# Clone and bootstrap
git clone https://github.com/yourusername/bilio.git
cd bilio

# Environment
cp .env.example .env    # root env (edit values)
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env.local

# Option A: Docker Compose
docker-compose up -d

# Option B: Manual services
## Backend
cd backend
go mod download
go run ./cmd/server

## Frontend
cd ../frontend
npm install
npm run dev
```

## Configuration

Configure environment variables before starting services:

```env
# Backend
DATABASE_URL=postgres://user:pass@localhost:5432/bilio
REDIS_URL=redis://localhost:6379
EMAIL_USER=...
EMAIL_PASSWORD=...
APP_EMAIL_FROM=waitlist@bilio.com
APP_CORS_ALLOWED_ORIGINS=http://localhost:3000

# Frontend
NEXT_PUBLIC_BACKEND_URL=http://localhost:8080
```

### Feature Toggles & Secrets
- Payment providers: `STRIPE_SECRET_KEY`, `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`
- Object storage: `S3_BUCKET`, `S3_REGION`, `S3_ACCESS_KEY_ID`, `S3_SECRET_ACCESS_KEY`
- JWT authentication: `JWT_SECRET`

## API Overview

The REST API lives under `/api/v1`. Key resources include:

| Resource | Description |
| --- | --- |
| `POST /auth/register` | Create a workspace owner |
| `POST /auth/login` | JWT-based authentication |
| `GET/POST /clients` | Manage client records |
| `GET/POST /invoices` | Issue invoices, generate PDFs |
| `POST /invoices/{id}/send` | Email invoice to client |
| `POST /invoices/{id}/mark-paid` | Manual payment reconciliation |
| `GET/POST /expenses` | Track spending |
| `GET /reports/summary` | Revenue vs expenses |
| `GET /reports/client-profit/{id}` | Per-client profitability |
| `GET /reports/tax-summary` | Tax preparation export |

> Full OpenAPI documentation is in progress. For now, see `backend/internal/app/handlers/` and `backend/internal/app/repositories/`.

## Development Workflow

### Testing
```bash
# Backend tests
cd backend
go test ./...

# Frontend tests (Playwright / Jest)
cd ../frontend
npm test
```

### Database Migrations
```bash
migrate -path backend/migrations -database $DATABASE_URL up   # apply
migrate -path backend/migrations -database $DATABASE_URL down 1   # rollback
```

### Live Reload
```bash
# Backend
cd backend
air   # or use a Go file watcher of your choice

# Frontend
cd ../frontend
npm run dev
```

## Roadmap

| Quarter | Focus |
| --- | --- |
| **Q1 2025 (MVP)** | ✅ Invoicing & expenses core, ✅ Stripe/Razorpay, ✅ PDF, ✅ Reports |
| **Q2 2025** | Multi-user workspaces, client portal, mobile app, expanded payments |
| **Q3 2025** | Accounting integrations, WhatsApp/SMS reminders, advanced tax templates, time tracking |
| **Q4 2025** | Public API, white-label, AI-powered expense categorization, payroll add-ons |

## Community
- Documentation: _coming soon_
- Email: support@bilio.com
- Twitter: [@biliohq](https://twitter.com/biliohq)
- Discord: invite pending

---

Built with ❤️ for agencies and freelancers who deserve better financial tools. Let us know how Bilio can help your business thrive.