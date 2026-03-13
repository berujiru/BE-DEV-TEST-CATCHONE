import { Router } from 'express';
import { getCustomers } from './customer.controller.js';

const router = Router();

/**
 * @openapi
 * /api/customers:
 * get:
 * summary: Retrieve a paginated list of customers
 * tags:
 * - Customers
 * parameters:
 * - in: query
 * name: page
 * schema:
 * type: integer
 * default: 1
 * - in: query
 * name: limit
 * schema:
 * type: integer
 * default: 10
 * - in: query
 * name: search
 * schema:
 * type: string
 * description: Search by first name, last name, or email
 * responses:
 * 200:
 * description: Success
 */
router.get('/', getCustomers);

export default router;