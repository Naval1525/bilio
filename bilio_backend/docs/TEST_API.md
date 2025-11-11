# API Testing Guide

This document contains all curl commands to test the BillStack API endpoints.

## Prerequisites

1. Start the server: `go run cmd/server/main.go`
2. Run migrations: `migrate -path migrations -database $DATABASE_URL up`
3. Set environment variable: `export JWT_SECRET=your-secret-key`

## Base URL

```
http://localhost:8080/api/v1
```

## 1. Authentication

### Register
```bash
curl -X POST http://localhost:8080/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "name": "Test User",
    "workspace_name": "Test Workspace"
  }'
```

### Login
```bash
curl -X POST http://localhost:8080/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

**Save the token from the response for authenticated requests.**

---

## 2. Clients

Replace `YOUR_TOKEN` with the JWT token from login/register.

### List All Clients
```bash
curl -X GET http://localhost:8080/api/v1/clients \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Create Client
```bash
curl -X POST http://localhost:8080/api/v1/clients \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "name": "Acme Corporation",
    "email": "contact@acme.com",
    "company": "Acme Corp",
    "phone": "+1-555-0123",
    "address": "123 Business St, City, State 12345",
    "tax_id": "TAX-123456",
    "currency": "USD"
  }'
```

### Get Client by ID
```bash
curl -X GET http://localhost:8080/api/v1/clients/CLIENT_ID \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Update Client
```bash
curl -X PUT http://localhost:8080/api/v1/clients/CLIENT_ID \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "name": "Acme Corporation Updated",
    "email": "newcontact@acme.com",
    "company": "Acme Corp",
    "phone": "+1-555-0123",
    "address": "456 New St, City, State 12345",
    "tax_id": "TAX-123456",
    "currency": "USD"
  }'
```

### Delete Client
```bash
curl -X DELETE http://localhost:8080/api/v1/clients/CLIENT_ID \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## 3. Invoices

### List All Invoices
```bash
curl -X GET http://localhost:8080/api/v1/invoices \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### List Invoices with Filters
```bash
# Filter by status
curl -X GET "http://localhost:8080/api/v1/invoices?status=pending" \
  -H "Authorization: Bearer YOUR_TOKEN"

# Filter by client
curl -X GET "http://localhost:8080/api/v1/invoices?client_id=CLIENT_ID" \
  -H "Authorization: Bearer YOUR_TOKEN"

# Filter by date range
curl -X GET "http://localhost:8080/api/v1/invoices?from_date=2024-01-01&to_date=2024-01-31" \
  -H "Authorization: Bearer YOUR_TOKEN"

# Combine filters
curl -X GET "http://localhost:8080/api/v1/invoices?status=pending&client_id=CLIENT_ID&from_date=2024-01-01" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Create Invoice
```bash
curl -X POST http://localhost:8080/api/v1/invoices \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "client_id": "CLIENT_ID",
    "invoice_number": "INV-001",
    "status": "draft",
    "issue_date": "2024-01-15T00:00:00Z",
    "due_date": "2024-02-15T00:00:00Z",
    "currency": "USD",
    "tax_rate": 10.0,
    "notes": "Payment terms: Net 30",
    "items": [
      {
        "description": "Web Development Services",
        "quantity": 40,
        "unit_price": 100.00
      },
      {
        "description": "Design Services",
        "quantity": 20,
        "unit_price": 75.00
      }
    ]
  }'
```

### Get Invoice by ID
```bash
curl -X GET http://localhost:8080/api/v1/invoices/INVOICE_ID \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Update Invoice
```bash
curl -X PUT http://localhost:8080/api/v1/invoices/INVOICE_ID \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "status": "pending",
    "issue_date": "2024-01-15T00:00:00Z",
    "due_date": "2024-02-15T00:00:00Z",
    "currency": "USD",
    "tax_rate": 10.0,
    "notes": "Updated payment terms",
    "items": [
      {
        "description": "Web Development Services",
        "quantity": 50,
        "unit_price": 100.00
      },
      {
        "description": "Design Services",
        "quantity": 25,
        "unit_price": 75.00
      }
    ]
  }'
```

### Mark Invoice as Paid
```bash
curl -X POST http://localhost:8080/api/v1/invoices/INVOICE_ID/mark-paid \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "amount": 6875.00,
    "currency": "USD",
    "payment_method": "stripe",
    "payment_date": "2024-01-20T00:00:00Z",
    "transaction_id": "txn_123456789",
    "notes": "Payment received via Stripe"
  }'
```

### Send Invoice (Placeholder)
```bash
curl -X POST http://localhost:8080/api/v1/invoices/INVOICE_ID/send \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Get Invoice PDF (Placeholder)
```bash
curl -X GET http://localhost:8080/api/v1/invoices/INVOICE_ID/pdf \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## 4. Expenses

### List All Expenses
```bash
curl -X GET http://localhost:8080/api/v1/expenses \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### List Expenses with Filters
```bash
# Filter by client
curl -X GET "http://localhost:8080/api/v1/expenses?client_id=CLIENT_ID" \
  -H "Authorization: Bearer YOUR_TOKEN"

# Filter by category
curl -X GET "http://localhost:8080/api/v1/expenses?category=travel" \
  -H "Authorization: Bearer YOUR_TOKEN"

# Filter by date range
curl -X GET "http://localhost:8080/api/v1/expenses?from_date=2024-01-01&to_date=2024-01-31" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Create Expense
```bash
curl -X POST http://localhost:8080/api/v1/expenses \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "client_id": "CLIENT_ID",
    "description": "Office Supplies",
    "amount": 150.00,
    "currency": "USD",
    "category": "office",
    "expense_date": "2024-01-10T00:00:00Z",
    "receipt_url": "https://example.com/receipts/receipt-001.pdf",
    "notes": "Purchased office supplies for project"
  }'
```

### Get Expense by ID
```bash
curl -X GET http://localhost:8080/api/v1/expenses/EXPENSE_ID \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Update Expense
```bash
curl -X PUT http://localhost:8080/api/v1/expenses/EXPENSE_ID \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "client_id": "CLIENT_ID",
    "description": "Office Supplies (Updated)",
    "amount": 175.00,
    "currency": "USD",
    "category": "office",
    "expense_date": "2024-01-10T00:00:00Z",
    "receipt_url": "https://example.com/receipts/receipt-001-updated.pdf",
    "notes": "Updated expense with additional items"
  }'
```

---

## 5. Reports

### Get Summary Report
```bash
# All time
curl -X GET http://localhost:8080/api/v1/reports/summary \
  -H "Authorization: Bearer YOUR_TOKEN"

# With date range
curl -X GET "http://localhost:8080/api/v1/reports/summary?from_date=2024-01-01&to_date=2024-01-31" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Get Client Profitability Report
```bash
# All time
curl -X GET http://localhost:8080/api/v1/reports/client-profit/CLIENT_ID \
  -H "Authorization: Bearer YOUR_TOKEN"

# With date range
curl -X GET "http://localhost:8080/api/v1/reports/client-profit/CLIENT_ID?from_date=2024-01-01&to_date=2024-01-31" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Get Tax Summary
```bash
curl -X GET "http://localhost:8080/api/v1/reports/tax-summary?from_date=2024-01-01&to_date=2024-01-31" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## Quick Test Script

You can also use the automated test script:

```bash
chmod +x test_api.sh
./test_api.sh
```

This script will:
1. Register/login and get a token
2. Test all endpoints in sequence
3. Use the IDs from previous responses for subsequent requests

---

## Response Examples

### Successful Response
```json
{
  "id": "uuid-here",
  "name": "Client Name",
  ...
}
```

### Error Response
```json
{
  "error": "Error message here"
}
```

### Authentication Error
```json
{
  "error": "unauthorized"
}
```

---

## Notes

- All protected endpoints require the `Authorization: Bearer YOUR_TOKEN` header
- Date formats: Use ISO 8601 format (e.g., `2024-01-15T00:00:00Z`) for datetime fields
- Date filters: Use `YYYY-MM-DD` format (e.g., `2024-01-15`)
- Invoice statuses: `draft`, `pending`, `paid`, `overdue`, `cancelled`
- Currency defaults to `USD` if not specified
- Invoice items are required when creating/updating invoices

