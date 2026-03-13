import express from 'express';
import cors from 'cors';
import swaggerJsdoc from 'swagger-jsdoc';
import apiRoutes from './routes.js'; // Use .js extension
import { apiReference } from '@scalar/express-api-reference';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || 'http://localhost:5173';

// Setup Middleware
app.use(cors({
  // Explicitly allow your frontend origin
  origin: ALLOWED_ORIGIN, 
  // Allow cookies/headers to be sent
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-api-key']
}));

app.use(express.json());

// Swagger Configuration
const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Customer Management API',
      version: '1.0.0',
      description: 'Modular API for managing customer records'
    },
    servers: [{ url: `http://localhost:${PORT}` }],
    components: {
      schemas: {
        Customer: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            first_name: { type: 'string' },
            last_name: { type: 'string' },
            email: { type: 'string' },
            gender: { type: 'string' },
            company: { type: 'string' },
            title: { type: 'string' }
          }
        }
      }
    }
  },
  apis: ['./src/modules/**/*.ts'],
});

// Primary API Routes
app.use('/api', apiRoutes);

// Documentation UI
app.use('/reference', apiReference({
  spec: { content: swaggerSpec },
  theme: 'purple'
}));

app.get('/api-json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

// Global Error Handler (Always Last)
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`🔥 Server running: http://localhost:${PORT}`);
  console.log(`📄 API Docs: http://localhost:${PORT}/reference`);
});