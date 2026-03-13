# Backend Developer Test - CatchOne

A full-stack application built with TypeScript that demonstrates modern web development practices. It includes a backend API with CSV import functionality and a responsive React frontend for displaying customer data with pagination and search.

## Project Overview

This project implements:
- ✅ CSV data import into SQLite database
- ✅ RESTful API with pagination and search
- ✅ Service-oriented architecture (Controller → Service → Database)
- ✅ TypeScript for type safety (both backend and frontend)
- ✅ OpenAPI/Swagger documentation
- ✅ Responsive React frontend with Tailwind CSS
- ✅ Real-time search with debouncing
- ✅ Loading states and skeleton screens
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
├── client/
│   ├── src/
│   │   ├── App.tsx            # Root component
│   │   ├── main.tsx           # React entry point
│   │   ├── features/
│   │   │   └── customers/
│   │   │       ├── hooks/
│   │   │       │   └── use-customers.ts      # Custom React hook for API calls
│   │   │       └── components/
│   │   │           └── CustomerList.tsx      # Main list component
│   │   ├── hooks/
│   │   │   └── use-debounce.ts              # Debounce utility hook
│   │   └── types/
│   │       └── generated/
│   │           └── backend.d.ts            # Auto-generated types from OpenAPI
│   ├── package.json
│   ├── vite.config.ts
│   └── tsconfig.json
└── README.md
```

## Prerequisites

- **Node.js** (v16 or higher)
- **npm** (comes with Node.js)

## Installation

### Backend Setup

1. **Install server dependencies:**
   ```bash
   cd server
   npm install
   ```

2. **Configure environment variables:**
   Create a `.env` file in the `server/` directory by copying the .env.example:
   ```env
   PORT=3000
   DATABASE_PATH=./database.sqlite
   ALLOWED_ORIGIN=http://localhost:5173
   ```

### Frontend Setup

1. **Install client dependencies:**
   ```bash
   cd client
   npm install
   ```

2. **Configure environment variables (optional):**
   Create a `.env` file in the `client/` directory (uses `http://localhost:3000` by default):
   ```env
   VITE_PORT=5173
   VITE_API_BASE_URL=http://localhost:3000/api
   VITE_API_KEY=your_placeholder_key_here
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

### Step 2: Start the Backend Server

Run the backend development server:

```bash
cd server
npm run dev
```

The backend server will start on `http://localhost:3000`

**Available endpoints:**
- REST API: `http://localhost:3000/api/customers`
- API Documentation: `http://localhost:3000/reference`

### Step 3: Start the Frontend Application

In a new terminal, run the frontend development server:

```bash
cd client
npm run dev
```

The frontend will start on `http://localhost:5173` and automatically connect to the backend API.

**Features:**
- 📱 Responsive design (mobile, tablet, desktop)
- 🔍 Real-time search with debouncing (500ms delay)
- 📄 Pagination with next/previous navigation
- ⚡ Loading states with skeleton screens
- 🎨 Modern UI with Tailwind CSS


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
      "first_name": "Laura",
      "last_name": "Richards",
      "email": "lrichards0@reverbnation.com",
      "gender": "Female",
      "ip_address": "81.192.7.99",
      "company": "Meezzy",
      "city": "Kallithéa",
      "title": "Biostatistician III",
      "website": "https://intel.com/..."
    }
  ],
  "meta": {
    "total": 1000,
    "page": 1,
    "limit": 10,
    "last_page": 100
  }
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

## Frontend Features

The React frontend provides:

### Customer List View
- **Desktop Table View** - 8-column table with all customer details:
  - Name, Email, Position, Company, City, Gender, IP Address, Website
- **Mobile Card View** - Responsive cards showing all information organized by sections
- **Responsive Design** - Automatically adapts to mobile, tablet, and desktop screens

### Search & Filter
- Real-time search input with 500ms debouncing
- Search across first name, last name, and email fields
- Search term persists while navigating pages

### Pagination
- Previous/Next button navigation
- Page indicator showing current page and total pages
- Automatic scroll to top on page change
- Buttons disabled at boundaries (first/last page)

### Loading States
- Skeleton screens matching content layout
- Smooth transitions between loading and loaded states
- Disabled search input during data fetch

### Data Display
- Clean, modern UI with Tailwind CSS
- Color-coded badges for Position and Gender
- Clickable website links opening in new tabs
- Monospace font for IP addresses

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

### Backend

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

### Frontend

```bash
# Development server (with hot reload)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linting
npm run lint
```

## Technologies Used

### Backend
- **Language:** TypeScript
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** SQLite
- **CSV Parser:** csv-parser
- **Documentation:** Swagger/OpenAPI with Scalar
- **Code Quality:** ESLint, Prettier

### Frontend
- **Language:** TypeScript
- **Framework:** React 18
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **HTTP Client:** openapi-fetch
- **Type Generation:** openapi-typescript
- **Package Manager:** npm

## Code Architecture

### Backend Architecture

The backend follows a **layered architecture pattern** with clear separation of concerns:

```
Request → Routes → Controller → Service → Database
```

- **Routes Layer** (`customer.routes.ts`) - Defines HTTP endpoints with OpenAPI documentation
- **Controller Layer** (`customer.controller.ts`) - Handles request/response processing and parameter validation
- **Service Layer** (`customer.service.ts`) - Contains business logic and database queries
- **Database Layer** (`db.ts`) - SQLite connection and query execution

**Benefits:**
- Easy to test each layer independently
- Clear separation of concerns
- Reusable business logic
- Type-safe operations with TypeScript

### Frontend Architecture

The frontend follows **React best practices**:

- **Custom Hooks** (`use-customers.ts`, `use-debounce.ts`) - Encapsulate API calls and state logic
- **Component Composition** - Reusable components with clear props
- **Type Safety** - Auto-generated types from OpenAPI schema
- **Responsive Design** - Mobile-first approach with Tailwind CSS

## Key Features

### Pagination
- **Backend:** Efficient offset-based pagination reducing memory usage
- **Frontend:** Previous/Next navigation with automatic scroll to top
- Configurable page size
- Total record count included in response

### Search
- **Backend:** Full-text search across first name, last name, and email
- **Frontend:** Real-time search with 500ms debouncing to prevent excessive API calls
- Case-insensitive partial matching using SQL LIKE

### Type Safety
- Full TypeScript types for entities and responses
- Type-checked database queries
- Auto-generated frontend types from OpenAPI schema

### Documentation & DX
- JSDoc comments on all methods
- OpenAPI/Swagger endpoint documentation
- Interactive API reference at `/reference`
- Clean, modular code structure

## Performance & Quality

### Performance
- **Backend:** Parameterized queries and connection pooling
- **Frontend:** Debounced search, skeleton screens, responsive design

### Security
- SQL injection prevention with parameterized queries
- Proper CORS configuration
- Input validation on server side
- Generic error messages

### Accessibility
- Semantic HTML structure
- Keyboard navigation support
- WCAG AA compliant color contrast
- Touch-friendly interactions

## Development Guidelines

### Code Style
- Follow ESLint rules (configured in `.eslintrc.json`)
- Use ES modules with `.js` extensions in imports
- Always define TypeScript interfaces for data models

### Best Practices
- Add JSDoc for public methods and complex logic
- Handle errors gracefully with appropriate HTTP status codes
- Write self-documenting code with clear variable names
- Keep components small and focused

## Troubleshooting

### Backend Issues

**Issue:** Database file not found
- **Solution:** Run `npm run import` in the server directory to create and populate the database

**Issue:** Port already in use
- **Solution:** Change the PORT in `server/.env` file or kill the process using port 3000

**Issue:** TypeScript compilation errors
- **Solution:** Run `npm install` to ensure all types are installed

**Issue:** CSV import fails
- **Solution:** Verify that `data/customers.csv` exists and has the correct format

### Frontend Issues

**Issue:** Frontend can't connect to backend API
- **Solution:** Ensure the backend is running on `http://localhost:3000` or update `VITE_API_URL` in `client/.env`

**Issue:** Types not generated
- **Solution:** Run `npx openapi-typescript http://localhost:3000/api-json --output src/types/generated/backend.d.ts` in the client directory

**Issue:** Port 5173 already in use
- **Solution:** Change the port in `client/vite.config.ts` or kill the process using port 5173

**Issue:** Empty customer list displayed
- **Solution:** Ensure CSV data was imported successfully (`npm run import` in server directory)

## Development Workflow

### First Time Setup

```bash
# 1. From project root, setup backend
cd server
npm install
npm run import
npm run dev

# 2. In another terminal, setup frontend
cd client
npm install
npm run dev

# 3. Open http://localhost:5173 in your browser
```

### During Development

- **Backend**: Changes to TypeScript files in `server/src/` are automatically reloaded
- **Frontend**: Changes to React components and styles are automatically reflected via Vite HMR
- **API Changes**: If backend routes change, regenerate types: `npx openapi-typescript http://localhost:3000/api-json --output src/types/generated/backend.d.ts`

