# Backend Developer Test - CatchOne

A Backend API built with TypeScript, Express, and SQLite that imports customer data from CSV and provides a paginated REST API with search functionality.

## Project Overview

This project implements:
- ✅ CSV data import into SQLite database
- ✅ RESTful API with pagination and search
- ✅ Service-oriented architecture (Controller → Service → Database)
- ✅ TypeScript for type safety
- ✅ OpenAPI/Swagger documentation
- ✅ Environment configuration with `.env`

## Project Structure

```
.
├── data/
│   └── customers.csv          # Source customer data
├── server/
│   ├── src/
│   │   ├── index.ts           # Express server entry point
│   │   ├── db.ts              # Database connection
│   │   ├── importer.ts        # CSV import script
│   │   ├── routes.ts          # API routes
│   │   └── modules/
│   │       └── customer/
│   │           ├── customer.controller.ts   # Request handlers
│   │           ├── customer.service.ts      # Business logic
│   │           ├── customer.schema.ts       # TypeScript types
│   │           └── customer.routes.ts       # Endpoint definitions
│   ├── package.json
│   ├── tsconfig.json
│   └── database.sqlite        # SQLite database (generated after import)
└── README.md
```

## Prerequisites

- **Node.js** (v16 or higher)
- **npm** (comes with Node.js)

## Installation

1. **Install dependencies:**
   ```bash
   cd server
   npm install
   ```

2. **Configure environment variables:**
   Create a `.env` file in the `server/` directory:
   ```env
   PORT=3000
   DATABASE_PATH=./database.sqlite
   ```

## Getting Started

### Step 1: Import Customer Data

Import the CSV data from `data/customers.csv` into the SQLite database:

```bash
cd server
npm run import
```

This will:
- Create the `database.sqlite` file (if it doesn't exist)
- Create the `customers` table with schema
- Import all records from `data/customers.csv`

### Step 2: Start the Server

Run the development server:

```bash
cd server
npm run dev
```

The server will start on `http://localhost:3000`

## API Endpoints

### Get Paginated Customers

**Endpoint:** `GET /api/customers`

**Query Parameters:**
- `page` (integer, default: 1) - Page number (1-indexed)
- `limit` (integer, default: 10) - Records per page
- `search` (string, optional) - Search by first name, last name, or email (partial match)

**Success Response (200):**
```json
{
  "data": [
    {
      "id": 1,
      "first_name": "John",
      "last_name": "Doe",
      "email": "john@example.com"
    }
  ],
  "total": 42
}
```

**Examples:**

Get first page with 10 records:
```bash
curl "http://localhost:3000/api/customers"
```

Get second page with 5 records per page:
```bash
curl "http://localhost:3000/api/customers?page=2&limit=5"
```

Search for customers:
```bash
curl "http://localhost:3000/api/customers?search=john"
```

## API Documentation

Interactive Swagger/OpenAPI documentation is available at:
```
http://localhost:3000/reference
```

## Architecture

The project follows a **layered architecture pattern**:

- **Routes Layer** (`customer.routes.ts`) - Defines HTTP endpoints with OpenAPI docs
- **Controller Layer** (`customer.controller.ts`) - Handles request/response processing
- **Service Layer** (`customer.service.ts`) - Contains business logic and database queries
- **Database Layer** (`db.ts`) - SQLite connection and initialization

This separation ensures:
- Easy testing and maintenance
- Clear separation of concerns
- Reusable business logic
- Type-safe operations

## Available Scripts

```bash
# Development (with hot reload via ts-node)
npm run dev

# Import CSV data to database
npm run import

# Build TypeScript to JavaScript
npm run build

# Run tests (to be implemented)
npm run test
```

## Technologies Used

- **Language:** TypeScript
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** SQLite
- **CSV Parser:** csv-parser
- **Documentation:** Swagger/OpenAPI with Scalar
- **Code Quality:** ESLint, Prettier

## Key Features

### Pagination
- Efficient offset-based pagination
- Configurable page size
- Total record count included in response

### Search
- Full-text search across first name, last name, and email
- Case-insensitive partial matching using SQL LIKE

### Type Safety
- Full TypeScript types for entities and responses
- Type-checked database queries

### Documentation
- JSDoc comments on all methods
- OpenAPI/Swagger endpoint documentation
- Interactive API reference

## Development Guidelines

1. **Code Style:** Follow ESLint rules (configured in `.eslintrc.json`)
2. **Exports:** Use ES modules (`.js` extensions in imports)
3. **Types:** Always define TypeScript interfaces for data models
4. **Comments:** Add JSDoc for public methods and complex logic
5. **Error Handling:** Graceful error responses with appropriate HTTP status codes

## Troubleshooting

**Issue:** Database file not found
- **Solution:** Run `npm run import` to create and populate the database

**Issue:** Port already in use
- **Solution:** Change the PORT in `.env` file

**Issue:** TypeScript compilation errors
- **Solution:** Run `npm install` to ensure all types are installed

