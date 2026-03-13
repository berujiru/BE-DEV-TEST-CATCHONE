import { Router } from 'express';
import { getCustomers } from './customer.controller.js';

const router = Router();
/**
 * @openapi
 * /api/customers:
 *   get:
 *     summary: Retrieve a paginated list of customers with optional search
 *     description: Returns paginated customer records. Supports searching by first name, last name, or email.
 *     tags:
 *       - Customers
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number (1-indexed)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of records per page
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search by first name, last name, or email (partial match)
 *     responses:
 *       200:
 *         description: Successfully retrieved paginated customers
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       first_name:
 *                         type: string
 *                       last_name:
 *                         type: string
 *                       email:
 *                         type: string
 *                 total:
 *                   type: integer
 *                   description: Total count of matching records (across all pages)
 *               example:
 *                 data:
 *                   - id: 1
 *                     first_name: "John"
 *                     last_name: "Doe"
 *                     email: "john@example.com"
 *                 total: 42
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *               example:
 *                 error: "Database connection failed"
 */
router.get('/', getCustomers);

export default router;